import { motion } from 'framer-motion'
import { useMemo, useState, useRef, useCallback, useEffect } from 'react'

function GridSystem({ 
  gridState,
  inputPercentage,
  wasteIndices,
  targetPercentage,
  levelConfig,
  onCellToggle,
  onSliderChange,
  selectedCount,
  timeRemaining,
}) {
  const totalCells = levelConfig.totalCells
  const gridCols = levelConfig.gridCols
  const gridRows = levelConfig.gridRows

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef(null)
  const hasMovedRef = useRef(false)
  const mouseDownRef = useRef(false)
  const dragModeRef = useRef(null) // 'fill' or 'erase'
  const processedCellsRef = useRef(new Set()) // Track cells already processed during drag

  // Calculate cell states from gridState and wasteIndices
  const cellStates = useMemo(() => {
    return gridState.map((filled, index) => {
      if (wasteIndices[index]) return 'waste'
      if (filled) return 'filled'
      return 'empty'
    })
  }, [gridState, wasteIndices])

  // Calculate total filled for plant status
  const totalFilled = useMemo(() => {
    const filledCount = gridState.filter((cell, index) => cell && !wasteIndices[index]).length
    const wasteCount = wasteIndices.filter(Boolean).length
    return filledCount + wasteCount
  }, [gridState, wasteIndices])

  const requiredCells = Math.round((totalCells * targetPercentage) / 100)
  const progressRatio = Math.min(1, totalFilled / Math.max(1, requiredCells))

  // Handle mouse down
  const handleMouseDown = useCallback((index, e) => {
    e.preventDefault()
    e.stopPropagation()
    mouseDownRef.current = true
    dragStartRef.current = index
    hasMovedRef.current = false
    setIsDragging(false)
    processedCellsRef.current.clear()
    
    // Determine drag mode based on initial cell state
    if (gridState[index]) {
      dragModeRef.current = 'erase' // Start from filled cell = erase mode
    } else {
      dragModeRef.current = 'fill' // Start from empty cell = fill mode
    }
  }, [gridState])

  // Handle mouse enter (during drag) - Enhanced sliding selection
  const handleMouseEnter = useCallback((index, e) => {
    if (!mouseDownRef.current) return
    
    e.preventDefault()
    e.stopPropagation()
    
    // Skip waste cells
    if (wasteIndices[index]) return
    
    // Skip if already processed this cell in this drag session
    if (processedCellsRef.current.has(index)) return
    
    // Mark that mouse has moved
    if (dragStartRef.current !== null && dragStartRef.current !== index) {
      hasMovedRef.current = true
      setIsDragging(true)
    }
    
    // If dragging, apply fill or erase based on drag mode
    if (onCellToggle && hasMovedRef.current && dragModeRef.current) {
      const currentState = gridState[index]
      const mode = dragModeRef.current
      
      // Apply the action based on mode
      if (mode === 'fill' && !currentState) {
        // Fill empty cell
        onCellToggle(index)
        processedCellsRef.current.add(index)
      } else if (mode === 'erase' && currentState) {
        // Erase filled cell
        onCellToggle(index)
        processedCellsRef.current.add(index)
      }
    }
  }, [onCellToggle, gridState, wasteIndices])

  // Handle mouse up
  const handleMouseUp = useCallback((e) => {
    if (mouseDownRef.current && dragStartRef.current !== null && !hasMovedRef.current) {
      // This was a click, not a drag - toggle the cell
      if (onCellToggle && !wasteIndices[dragStartRef.current]) {
        onCellToggle(dragStartRef.current)
      }
    }
    mouseDownRef.current = false
    dragStartRef.current = null
    hasMovedRef.current = false
    setIsDragging(false)
    dragModeRef.current = null
    processedCellsRef.current.clear()
  }, [onCellToggle, wasteIndices])

  // Start drag after movement
  useEffect(() => {
    if (mouseDownRef.current) {
      const timer = setTimeout(() => {
        if (mouseDownRef.current && hasMovedRef.current) {
          setIsDragging(true)
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [mouseDownRef.current, hasMovedRef.current])

  // Get cell class based on state - Enhanced with rounded-sm and inner-shadow
  const getCellClass = (state, index) => {
    const baseClasses = 'rounded-sm border transition-all duration-200'
    const isWaste = wasteIndices[index]
    
    switch (state) {
      case 'filled':
        return `${baseClasses} bg-cyan-400 border-cyan-300 shadow-inner shadow-cyan-500/30 cursor-pointer hover:bg-cyan-300`
      case 'waste':
        return `${baseClasses} bg-red-500 border-red-400 shadow-inner shadow-red-500/30 cursor-not-allowed pointer-events-none`
      default:
        return `${baseClasses} bg-slate-700 border-white/10 cursor-pointer hover:bg-cyan-400/30 shadow-inner`
    }
  }

  // Calculate cell size based on grid size
  const getCellSize = () => {
    if (totalCells <= 50) return 'w-10 h-10'
    if (totalCells <= 100) return 'w-8 h-8'
    return 'w-6 h-6'
  }

  const cellSizeClass = getCellSize()
  const isLowTime = timeRemaining && timeRemaining <= 10 && timeRemaining > 0

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono">
          🚀 當前儲氣槽容量：{totalCells} 格
        </div>
        <div className="text-xl font-bold text-emerald-400 font-mono">
          目標達成量：{targetPercentage}%
        </div>
      </div>

      {/* Greenhouse Frame - Low Time Red Flash Effect */}
      <motion.div 
        className="border border-white/10 rounded-lg p-4 bg-slate-800/50 shadow-lg transition-all duration-300 relative"
        animate={isLowTime ? {
          backgroundColor: [
            'rgba(30, 41, 59, 0.5)',
            'rgba(239, 68, 68, 0.1)',
            'rgba(30, 41, 59, 0.5)',
          ]
        } : {}}
        transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
      >
        {/* Grid Container */}
        <div className="flex justify-center">
          <div className="overflow-x-auto no-select">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
              }}
              onMouseUp={(e) => {
                e.stopPropagation()
                handleMouseUp(e)
              }}
              onMouseLeave={(e) => {
                e.stopPropagation()
                if (isDragging) {
                  handleMouseUp(e)
                }
              }}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
            {cellStates.map((state, index) => {
              const isClickable = state === 'empty' || state === 'filled'
              const isWaste = state === 'waste'
              const isFilled = state === 'filled'
              
              return (
                <motion.div
                  key={`cell-${index}`}
                  className={`${cellSizeClass} ${getCellClass(state, index)} relative`}
                  style={{
                    boxSizing: 'border-box',
                    pointerEvents: isClickable ? 'auto' : 'none',
                    isolation: 'isolate',
                    cursor: isClickable ? 'pointer' : 'not-allowed',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                    boxShadow: isFilled ? [
                      '0 0 0px rgba(34, 211, 238, 0)',
                      '0 0 10px rgba(34, 211, 238, 0.8)',
                      '0 0 0px rgba(34, 211, 238, 0)',
                    ] : 'none',
                  }}
                  transition={{ duration: 0.1 }}
                  whileHover={isClickable ? { 
                    scale: 1.05,
                    boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)'
                  } : {}}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (isClickable) {
                      handleMouseDown(index, e)
                    }
                  }}
                  onClick={(e) => {
                    // Prevent default click behavior - handleMouseUp already handles the toggle
                    e.stopPropagation()
                    e.preventDefault()
                    // Don't call onCellToggle here - handleMouseUp already handles it
                    // This prevents double-toggling which causes double counting
                  }}
                  onMouseEnter={(e) => {
                    if (isClickable && mouseDownRef.current) {
                      handleMouseEnter(index, e)
                    }
                  }}
                  title={isWaste ? '廢料（已鎖定）' : isFilled ? '點擊取消選擇' : '點擊選擇'}
                />
              )
            })}
            </div>
          </div>
        </div>

        {/* Plant Life Indicator - Scanline Effect, Green when Near Target */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300 font-semibold">植物生命狀態</span>
            <span className={`font-bold font-mono ${
              progressRatio >= 0.8 ? 'text-emerald-400' :
              progressRatio >= 0.5 ? 'text-yellow-400' :
              progressRatio >= 0.2 ? 'text-orange-400' :
              'text-red-400'
            }`}>
              {progressRatio >= 0.8 ? '健康' : 
               progressRatio >= 0.5 ? '良好' : 
               progressRatio >= 0.2 ? '警告' : '危險'}
            </span>
          </div>
          <div className="relative h-4 w-full bg-slate-700 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className={`h-full transition-all duration-500 relative ${
                progressRatio >= 0.8 ? 'bg-emerald-500' :
                progressRatio >= 0.5 ? 'bg-yellow-500' :
                progressRatio >= 0.2 ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, progressRatio * 100)}%` }}
              transition={{ duration: 0.5 }}
            >
              {/* Scanline Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ width: '50%' }}
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>🌱</span>
            <span>氧氣水平：{progressRatio >= 0.8 ? '健康' : 
               progressRatio >= 0.5 ? '良好' : 
               progressRatio >= 0.2 ? '警告' : '危險'}</span>
          </div>
        </div>
      </motion.div>

      {/* Cell Count Display */}
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-slate-300 font-mono">
          已手動填充：{selectedCount} 格
          {wasteIndices.filter(Boolean).length > 0 && (
            <span className="text-red-400 ml-4">
              | 廢料佔用：{wasteIndices.filter(Boolean).length} 格
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default GridSystem
