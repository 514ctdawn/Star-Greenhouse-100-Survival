import { useState, useEffect, useCallback, useMemo } from 'react'
import { getLevelConfig, calculateWasteCells } from '../config/levels'

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState('A')
  const levelConfig = getLevelConfig(currentLevel)
  
  const [oxygen, setOxygen] = useState(100)
  const [power, setPower] = useState(100)
  const [bioWaste, setBioWaste] = useState(0)
  
  const [targetPercentage, setTargetPercentage] = useState(levelConfig.targetPercentage)
  const [inputPercentage, setInputPercentage] = useState(0) // Slider input percentage
  
  // Unified grid state: boolean array for all cells
  const [gridState, setGridState] = useState(() => {
    return new Array(levelConfig.totalCells).fill(false)
  })
  
  // Waste cells indices (red cells, locked)
  const [wasteIndices, setWasteIndices] = useState(() => {
    const wasteCount = calculateWasteCells(levelConfig.totalCells, levelConfig.wastePercentage)
    const wasteArray = new Array(levelConfig.totalCells).fill(false)
    // Fill waste cells from the end
    for (let i = levelConfig.totalCells - 1; i >= levelConfig.totalCells - wasteCount; i--) {
      wasteArray[i] = true
    }
    return wasteArray
  })
  
  const [timeRemaining, setTimeRemaining] = useState(levelConfig.timeLimit)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [missionFailed, setMissionFailed] = useState(false)
  
  const [pressureWarning, setPressureWarning] = useState(false)
  const [plantWilting, setPlantWilting] = useState(false)
  const [lowOxygenTimer, setLowOxygenTimer] = useState(null)
  
  // Track failure attempts per level for progressive hints
  const [failureAttempts, setFailureAttempts] = useState({ A: 0, B: 0, C: 0 })

  // Initialize level
  useEffect(() => {
    const config = getLevelConfig(currentLevel)
    setTargetPercentage(config.targetPercentage)
    setTimeRemaining(config.timeLimit)
    setIsTimerRunning(true)
    setMissionFailed(false)
    
    // Reset grid state
    const newGridState = new Array(config.totalCells).fill(false)
    setGridState(newGridState)
    setInputPercentage(0)
    
    // Pre-fill waste cells
    const wasteCount = calculateWasteCells(config.totalCells, config.wastePercentage)
    const newWasteIndices = new Array(config.totalCells).fill(false)
    for (let i = config.totalCells - 1; i >= config.totalCells - wasteCount; i--) {
      newWasteIndices[i] = true
    }
    setWasteIndices(newWasteIndices)
    
    // Reset failure attempts when level changes (not on retry)
    // Only reset if it's a new level (not just a retry)
    setFailureAttempts(prev => {
      // Keep attempts for other levels, reset current level
      return { ...prev, [currentLevel]: 0 }
    })
  }, [currentLevel])

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning || missionFailed) return
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          setMissionFailed(true)
          setIsTimerRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, missionFailed])

  // Decay meters over time
  useEffect(() => {
    const interval = setInterval(() => {
      setOxygen(prev => Math.max(0, prev - 0.1))
      setPower(prev => Math.max(0, prev - 0.05))
      setBioWaste(prev => Math.min(100, prev + 0.05))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Check for plant wilting (oxygen < 20% for > 10 seconds)
  useEffect(() => {
    if (oxygen < 20) {
      if (!lowOxygenTimer) {
        const timer = setTimeout(() => {
          setPlantWilting(true)
        }, 10000)
        setLowOxygenTimer(timer)
      }
    } else {
      if (lowOxygenTimer) {
        clearTimeout(lowOxygenTimer)
        setLowOxygenTimer(null)
        setPlantWilting(false)
      }
    }

    return () => {
      if (lowOxygenTimer) {
        clearTimeout(lowOxygenTimer)
      }
    }
  }, [oxygen, lowOxygenTimer])

  // Calculate filled cells (excluding waste) - 即時更新
  const filledCells = useMemo(() => {
    // Only count cells that are filled AND not waste cells
    return gridState.filter((filled, index) => filled && !wasteIndices[index]).length
  }, [gridState, wasteIndices])
  
  const wasteCellsCount = useMemo(() => {
    return wasteIndices.filter(Boolean).length
  }, [wasteIndices])
  
  const totalFilledCells = useMemo(() => {
    return filledCells + wasteCellsCount
  }, [filledCells, wasteCellsCount])
  
  // Calculate total percentage based on actual cells - 即時更新
  const totalPercentage = useMemo(() => {
    return (totalFilledCells / levelConfig.totalCells) * 100
  }, [totalFilledCells, levelConfig.totalCells])

  // Check for pressure warning (total > 100%)
  useEffect(() => {
    if (totalPercentage > 100) {
      setPressureWarning(true)
    } else {
      setPressureWarning(false)
    }
  }, [totalPercentage])

  // Toggle cell state (manual click) - Unified State & Bidirectional Sync
  const toggleCell = useCallback((index) => {
    // Prevent toggling waste cells
    if (wasteIndices[index]) {
      console.log(`[狀態管理] 單元格 ${index} 是廢料格，無法切換`)
      return
    }

    setGridState(prev => {
      const newState = [...prev]
      // Toggle: empty -> true, filled -> false
      newState[index] = !newState[index]
      
      // Auto-Update Slider: Calculate total filled cells (excluding waste)
      const filledCount = newState.filter((filled, idx) => filled && !wasteIndices[idx]).length
      const percentage = (filledCount / levelConfig.totalCells) * 100
      setInputPercentage(percentage)
      
      console.log(`[狀態管理] 切換單元格 ${index}，新狀態：${newState[index] ? '已選' : '未選'}，總填充 ${filledCount} 格，同步滑桿至 ${percentage.toFixed(1)}%`)
      
      return newState
    })
  }, [wasteIndices, levelConfig.totalCells])

  // Update grid from slider (slider change) - Bidirectional Sync
  const updateFromSlider = useCallback((percentage) => {
    const targetCells = Math.round((percentage / 100) * levelConfig.totalCells)
    
    setGridState(prev => {
      const newState = new Array(levelConfig.totalCells).fill(false)
      let filledCount = 0
      
      // Slider Interaction: Fill first N non-waste cells from left to right
      for (let i = 0; i < levelConfig.totalCells && filledCount < targetCells; i++) {
        if (!wasteIndices[i]) {
          newState[i] = true
          filledCount++
        }
      }
      
      console.log(`[狀態管理] 滑桿更新至 ${percentage.toFixed(1)}%（${targetCells} 格），填充前 ${filledCount} 個非廢料格`)
      
      return newState
    })
    
    setInputPercentage(percentage)
  }, [levelConfig.totalCells, wasteIndices])

  const applyPercentage = useCallback(() => {
    // 重新計算當前網格狀態（防止狀態不同步）
    const totalCells = gridState.length
    const manualFilledCount = gridState.filter((cell, index) => cell && !wasteIndices[index]).length
    const wasteCount = wasteIndices.filter(Boolean).length
    const currentTotal = manualFilledCount + wasteCount
    
    // 計算目標需要的總格數：(總格數 * 目標百分比 / 100)
    const requiredCount = Math.round((totalCells * targetPercentage) / 100)
    
    console.log(`[判定邏輯] 總格數：${totalCells}，手動填滿：${manualFilledCount} 格，廢料：${wasteCount} 格，總計：${currentTotal} 格`)
    console.log(`[判定邏輯] 目標 ${targetPercentage}% 需要：${requiredCount} 格`)
    
    // 精確比較：使用整數比較，避免浮點數誤差
    // 判斷方式：(手動填滿 + 廢料) 是否等於 (總格數 * 目標百分比 / 100)
    const isCorrect = currentTotal === requiredCount
    
    if (isCorrect) {
      // Success! Reset failure attempts for this level
      console.log(`[判定邏輯] ✅ 任務成功！實際 ${currentTotal} 格 = 目標 ${requiredCount} 格`)
      setInputPercentage(0)
      setOxygen(prev => Math.min(100, prev + 10)) // Reward: restore oxygen
      setIsTimerRunning(false)
      // Reset failure attempts on success
      setFailureAttempts(prev => ({ ...prev, [currentLevel]: 0 }))
      return true
    } else {
      // Failure - increment attempt count
      console.log(`[判定邏輯] ❌ 任務失敗！實際 ${currentTotal} 格 ≠ 目標 ${requiredCount} 格`)
      setFailureAttempts(prev => ({
        ...prev,
        [currentLevel]: (prev[currentLevel] || 0) + 1
      }))
      return false
    }
  }, [gridState, wasteIndices, levelConfig.totalCells, targetPercentage, currentLevel])

  const resetGame = useCallback(() => {
    const config = getLevelConfig(currentLevel)
    setOxygen(100)
    setPower(100)
    setBioWaste(0)
    setInputPercentage(0)
    setTargetPercentage(config.targetPercentage)
    setPressureWarning(false)
    setPlantWilting(false)
    setTimeRemaining(config.timeLimit)
    setIsTimerRunning(true)
    setMissionFailed(false)
    
    // Reset grid state (all false, except waste)
    const newGridState = new Array(config.totalCells).fill(false)
    setGridState(newGridState)
    
    // Keep waste cells
    const wasteCount = calculateWasteCells(config.totalCells, config.wastePercentage)
    const newWasteIndices = new Array(config.totalCells).fill(false)
    for (let i = config.totalCells - 1; i >= config.totalCells - wasteCount; i--) {
      newWasteIndices[i] = true
    }
    setWasteIndices(newWasteIndices)
    
    // Note: Don't reset failure attempts on retry - keep them for progressive hints
    // Only reset on level change (handled in useEffect)
    
    if (lowOxygenTimer) {
      clearTimeout(lowOxygenTimer)
      setLowOxygenTimer(null)
    }
  }, [currentLevel, lowOxygenTimer])

  const changeLevel = useCallback((levelId) => {
    console.log('🎮 changeLevel called in useGameState:', levelId)
    console.log('🎮 Current level before change:', currentLevel)
    
    if (levelId && levelId !== currentLevel) {
      console.log('✅ Setting currentLevel to:', levelId)
      setCurrentLevel(levelId)
      
      // Reset failure attempts for the new level (will be handled by useEffect, but ensure it's reset)
      setFailureAttempts(prev => ({ ...prev, [levelId]: 0 }))
      
      // Force immediate update
      setTimeout(() => {
        console.log('🎮 Level should be changed to:', levelId)
      }, 0)
    } else {
      console.log('⚠️ Invalid level change:', { levelId, currentLevel })
    }
  }, [currentLevel])

  return {
    // Level info
    currentLevel,
    levelConfig,
    changeLevel,
    
    // Game state
    oxygen,
    power,
    bioWaste,
    targetPercentage,
    inputPercentage,
    wasteIndices,
    wasteCellsCount,
    filledCells,
    totalFilledCells,
    totalPercentage,
    
    // Unified grid state
    gridState,
    toggleCell,
    updateFromSlider,
    
    // Timer
    timeRemaining,
    isTimerRunning,
    missionFailed,
    
    // Effects
    pressureWarning,
    plantWilting,
    
    // Progressive hints
    failureAttempts,
    
    // Actions
    updateOxygen: setOxygen,
    updatePower: setPower,
    updateBioWaste: setBioWaste,
    setTargetPercentage,
    setInputPercentage,
    applyPercentage,
    resetGame,
    setIsTimerRunning,
  }
}
