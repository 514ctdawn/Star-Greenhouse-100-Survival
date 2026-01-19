import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopBar from './components/TopBar'
import GridSystem from './components/GridSystem'
import ControlPanel from './components/ControlPanel'
import TutorialManager, { useTutorial } from './components/TutorialManager'
import FeedbackModal from './components/FeedbackModal'
import CountdownBar from './components/CountdownBar'
import LevelSelector from './components/LevelSelector'
import { useGameState } from './hooks/useGameState'

function App() {
  const {
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
    
    // Actions
    setTargetPercentage,
    setInputPercentage,
    applyPercentage,
    resetGame,
    setIsTimerRunning,
  } = useGameState()

  const {
    isActive: isTutorialActive,
    currentStep,
    nextStep,
    skipTutorial,
    completeTutorial,
    startTutorial,
  } = useTutorial()

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    status: null,
  })

  const [showLevelSelector, setShowLevelSelector] = useState(false)
  const [levelTransition, setLevelTransition] = useState(null)

  // Handle level change with transition
  const handleLevelChange = (levelId) => {
    if (levelId !== currentLevel) {
      setLevelTransition({
        from: currentLevel,
        to: levelId,
        message: `警告！正在切換至${levelId === 'B' ? '小型備用儲氣槽（容量 50 單元）' : levelId === 'C' ? '大型儲氣槽（容量 200 單元）' : '標準儲氣槽（容量 100 單元）'}...`
      })
      setTimeout(() => {
        changeLevel(levelId)
        setLevelTransition(null)
      }, 2000)
    }
  }

  const handleApplyWithFeedback = () => {
    const success = applyPercentage()
    
    setFeedbackModal({
      isOpen: true,
      status: success ? 'success' : 'failure',
    })
    
    return success
  }

  const handleCloseFeedback = () => {
    // If failure, automatically retry the level
    if (feedbackModal.status === 'failure') {
      handleRetryLevel()
    } else {
      setFeedbackModal({ isOpen: false, status: null })
    }
  }

  const handleNextLevel = () => {
    // Auto progress to next level on success
    const nextLevelMap = { A: 'B', B: 'C', C: 'A' }
    const nextLevel = nextLevelMap[currentLevel]
    if (nextLevel) {
      handleLevelChange(nextLevel)
    }
    setFeedbackModal({ isOpen: false, status: null })
  }

  const handleRetry = () => {
    setFeedbackModal({ isOpen: false, status: null })
  }

  const handleRetryLevel = () => {
    // Reset current level without changing level
    resetGame()
    setFeedbackModal({ isOpen: false, status: null })
  }


  // Show mission failed modal when time runs out
  useEffect(() => {
    if (missionFailed && !feedbackModal.isOpen) {
      setFeedbackModal({
        isOpen: true,
        status: 'failure',
      })
    }
  }, [missionFailed, feedbackModal.isOpen])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Level Transition Animation */}
      <AnimatePresence>
        {levelTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[80] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-slate-800 border-2 border-yellow-500 rounded-lg p-8 max-w-md text-center"
            >
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                關卡切換中
              </h2>
              <p className="text-slate-300 text-lg">
                {levelTransition.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Tutorial Manager */}
      {isTutorialActive && (
        <TutorialManager
          currentStep={currentStep}
          onNext={nextStep}
          onSkip={skipTutorial}
          onComplete={completeTutorial}
          targetPercentage={targetPercentage}
          impurityPercentage={(wasteCellsCount / levelConfig.totalCells) * 100}
          inputPercentage={inputPercentage}
        />
      )}

      {/* Level Selector */}
      {showLevelSelector && (
        <LevelSelector
          currentLevel={currentLevel}
          onLevelChange={handleLevelChange}
          onClose={() => setShowLevelSelector(false)}
        />
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        status={feedbackModal.status}
        targetPercentage={targetPercentage}
        totalPercentage={totalPercentage}
        currentPercentage={filledCells}
        inputPercentage={inputPercentage}
        impurityPercentage={(wasteCellsCount / levelConfig.totalCells) * 100}
        impurityMode={wasteCellsCount > 0}
        wasteCellsCount={wasteCellsCount}
        totalCells={levelConfig.totalCells}
        onClose={handleCloseFeedback}
        onNext={handleNextLevel}
        onRetry={handleRetry}
        onRetryLevel={handleRetryLevel}
      />

      {/* Main Layout */}
      <div className="flex flex-col h-screen">
        {/* Countdown Bar */}
        <div className="px-4 pt-2 pb-2">
          <CountdownBar 
            timeRemaining={timeRemaining}
            timeLimit={levelConfig.timeLimit}
            missionFailed={missionFailed}
          />
        </div>

        {/* Main Content - Grid Centered */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
          <div className="w-full max-w-6xl mx-auto flex gap-4">
            {/* Center Canvas - Grid (Centered) */}
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <GridSystem
                gridState={gridState}
                inputPercentage={inputPercentage}
                wasteIndices={wasteIndices}
                targetPercentage={targetPercentage}
                levelConfig={levelConfig}
                onCellToggle={toggleCell}
                onSliderChange={updateFromSlider}
                selectedCount={filledCells}
                timeRemaining={timeRemaining}
              />
            </div>

            {/* Control Panel */}
            <div className="w-80 bg-slate-800/50 rounded-lg p-6 border border-white/10 relative flex flex-col overflow-hidden">
              <ControlPanel
                targetPercentage={targetPercentage}
                inputPercentage={inputPercentage}
                wasteCellsCount={wasteCellsCount}
                selectedCount={filledCells}
                levelConfig={levelConfig}
                onInputChange={setInputPercentage}
                onSliderChange={updateFromSlider}
                onApply={handleApplyWithFeedback}
                onReset={resetGame}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
