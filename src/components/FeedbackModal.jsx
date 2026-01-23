import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react'
import { useEffect } from 'react'
import { getLevelHint, getHintLevelDescription } from '../utils/hintSystem'

// Sound effect placeholders
const playSuccessSound = () => {
  // TODO: Implement success sound effect
  // Example: new Audio('/sounds/success.mp3').play()
  console.log('🔊 Playing success sound')
}

const playErrorSound = () => {
  // TODO: Implement error sound effect
  // Example: new Audio('/sounds/error.mp3').play()
  console.log('🔊 Playing error sound')
}

function FeedbackModal({ 
  isOpen, 
  status, 
  targetPercentage, 
  totalPercentage, 
  currentPercentage,
  inputPercentage,
  impurityPercentage,
  impurityMode,
  wasteCellsCount,
  totalCells,
  currentLevel, // Add current level for hints
  failureAttempts, // Add failure attempts count
  onClose,
  onNext,
  onRetry,
  onRetryLevel, // New: retry current level without changing
}) {
  useEffect(() => {
    if (isOpen) {
      if (status === 'success') {
        playSuccessSound()
      } else {
        playErrorSound()
      }
    }
  }, [isOpen, status])

  if (!isOpen) return null

  const gap = Math.abs(totalPercentage - targetPercentage)
  const isOver100 = totalPercentage > 100
  const isUnderTarget = totalPercentage < targetPercentage
  
  // Calculate actual cell counts for precise comparison
  const actualTotalCells = Math.round((totalPercentage / 100) * totalCells)
  const requiredTotalCells = Math.round((targetPercentage / 100) * totalCells)
  
  // Determine error type and message
  let errorType = null
  let errorMessage = null
  let hintMessage = null

  if (status === 'failure') {
    // Precise failure message using cell counts
    errorMessage = `不正確。對於 ${totalCells} 格的容器，${targetPercentage}% 需要 ${requiredTotalCells} 個總格數。您有 ${actualTotalCells} 個。`
    
    // Get progressive hint based on failure attempts
    const attemptCount = failureAttempts?.[currentLevel] || 1
    const progressiveHint = getLevelHint(currentLevel, attemptCount, totalCells, targetPercentage, wasteCellsCount)
    
    if (isOver100) {
      errorType = 'overload'
      hintMessage = `您填寫了 ${actualTotalCells} 格（含廢料 ${wasteCellsCount} 格），超過了目標所需的 ${requiredTotalCells} 格。\n\n${progressiveHint}`
    } else if (isUnderTarget) {
      errorType = 'insufficient'
      hintMessage = `目前只有 ${actualTotalCells} 格，還需要 ${requiredTotalCells - actualTotalCells} 格才能達到目標。\n\n${progressiveHint}`
    } else {
      errorType = 'mismatch'
      hintMessage = `目前總計 ${actualTotalCells} 格，但目標需要 ${requiredTotalCells} 格。請重新計算。\n\n${progressiveHint}`
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal - Perfectly Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              ...(status === 'failure' ? {
                x: [0, -5, 5, -5, 5, 0],
              } : {})
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3,
              ...(status === 'failure' ? {
                x: { duration: 0.5, repeat: 0 }
              } : {})
            }}
            className={`fixed z-[60] w-full max-w-lg mx-2 sm:mx-4 ${
              status === 'success'
                ? 'bg-emerald-900/95 border-2 border-emerald-400'
                : 'bg-rose-900/95 border-2 border-rose-400'
            } rounded-lg shadow-2xl overflow-hidden`}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 60,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div className={`p-3 sm:p-6 ${
              status === 'success'
                ? 'bg-emerald-800/50'
                : 'bg-rose-800/50'
            }`}>
              <div className="flex items-center gap-2 sm:gap-4">
                {status === 'success' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <XCircle className="w-8 h-8 sm:w-12 sm:h-12 text-rose-400" />
                  </motion.div>
                )}
                <div className="flex-1">
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                    status === 'success' ? 'text-emerald-300' : 'text-rose-300'
                  }`}>
                    {status === 'success' 
                      ? '任務達成！能源穩定。'
                      : '配比失衡！任務失敗。'
                    }
                  </h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
              {/* Main Message */}
              <p className={`text-sm sm:text-base lg:text-lg leading-relaxed ${
                status === 'success' ? 'text-emerald-100' : 'text-rose-100'
              }`}>
                {status === 'success' 
                  ? '優秀的計算，指揮官！溫室的百分比配比完全正確，植物正在茁壯成長。'
                  : errorMessage
                }
              </p>

              {/* Data Summary */}
              <div className={`p-2 sm:p-4 rounded-lg border ${
                status === 'success'
                  ? 'bg-emerald-800/30 border-emerald-500/50'
                  : 'bg-rose-800/30 border-rose-500/50'
              }`}>
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className={`${
                      status === 'success' ? 'text-emerald-300' : 'text-rose-300'
                    } font-semibold`}>目標：</span>
                    <span className={`ml-2 ${
                      status === 'success' ? 'text-emerald-100' : 'text-rose-100'
                    }`}>{targetPercentage}%</span>
                  </div>
                  <div>
                    <span className={`${
                      status === 'success' ? 'text-emerald-300' : 'text-rose-300'
                    } font-semibold`}>實際：</span>
                    <span className={`ml-2 ${
                      status === 'success' ? 'text-emerald-100' : 'text-rose-100'
                    }`}>{totalPercentage.toFixed(1)}%</span>
                  </div>
                  {status === 'failure' && (
                    <>
                      <div>
                        <span className="text-rose-300 font-semibold">當前：</span>
                        <span className="ml-2 text-rose-100">{currentPercentage.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-rose-300 font-semibold">輸入：</span>
                        <span className="ml-2 text-rose-100">{inputPercentage.toFixed(1)}%</span>
                      </div>
                      {impurityMode && impurityPercentage > 0 && (
                        <div className="col-span-2">
                          <span className="text-rose-300 font-semibold">雜質：</span>
                          <span className="ml-2 text-rose-100">{impurityPercentage.toFixed(1)}%</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Hint Message (for failures) */}
              {status === 'failure' && hintMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg"
                >
                  <HelpCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-yellow-300 text-xs font-semibold mb-1">
                      {failureAttempts?.[currentLevel] ? `第 ${failureAttempts[currentLevel]} 次嘗試 - ${getHintLevelDescription(failureAttempts[currentLevel])}` : '提示'}
                    </div>
                    <p className="text-yellow-200 text-sm leading-relaxed whitespace-pre-line">
                      {hintMessage}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Success Reward Animation */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 bg-emerald-800/30 rounded-lg border border-emerald-500/50"
                >
                  <div className="text-emerald-300 font-bold text-xl mb-1">
                    ✨ 獲得算力點數 +50
                  </div>
                  <div className="text-emerald-200 text-sm">
                    繼續保持精準計算！
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className={`p-3 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-3 ${
              status === 'success' ? 'bg-emerald-800/30' : 'bg-rose-800/30'
            }`}>
              {status === 'success' ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('🎮 Next level button clicked!')
                      if (onNext) {
                        onNext()
                      } else {
                        console.error('⚠️ onNext is not defined!')
                      }
                    }}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base"
                  >
                    進入下一關
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-700/50 hover:bg-emerald-700/70 active:bg-emerald-700/90 text-emerald-200 rounded-lg transition-colors touch-manipulation text-sm sm:text-base"
                  >
                    繼續強化基地
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onRetryLevel}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    重新嘗試本關
                  </button>
                  <button
                    onClick={onRetryLevel}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-rose-700/50 hover:bg-rose-700/70 active:bg-rose-700/90 text-rose-200 rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                    重新開始
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FeedbackModal

