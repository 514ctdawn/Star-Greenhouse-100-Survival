import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, SkipForward } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

function TutorialHighlight({ target }) {
  const highlightRef = useRef(null)

  useEffect(() => {
    const updatePosition = () => {
      const element = document.querySelector(`[data-tutorial-target="${target}"]`)
      if (element && highlightRef.current) {
        const rect = element.getBoundingClientRect()
        highlightRef.current.style.left = `${rect.left}px`
        highlightRef.current.style.top = `${rect.top}px`
        highlightRef.current.style.width = `${rect.width}px`
        highlightRef.current.style.height = `${rect.height}px`
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    // Update on a short interval to catch dynamic changes
    const interval = setInterval(updatePosition, 100)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      clearInterval(interval)
    }
  }, [target])

  return (
    <motion.div
      ref={highlightRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-45 pointer-events-none border-2 border-cyan-400 rounded-lg"
      style={{
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85), 0 0 30px rgba(6, 182, 212, 0.8), inset 0 0 20px rgba(6, 182, 212, 0.3)',
        transition: 'all 0.3s ease',
      }}
    />
  )
}

const TUTORIAL_STEPS = [
  {
    id: 'step1',
    target: 'topbar',
    title: '歡迎來到歐米茄基地！',
    content: '指揮官，你的任務是維持溫室的運作。請隨時監控氧氣、電力和生物廢料。若氧氣歸零，任務即告失敗。',
  },
  {
    id: 'step2',
    target: 'target-slider',
    title: '設定目標',
    content: '「目標百分比」代表植物目前的生存需求。請觀察中央的 10x10 網格，目前的氧氣量是 0%，你需要填滿它以達成目標。',
  },
  {
    id: 'step3',
    target: 'input-slider',
    title: '補充氧氣',
    content: '調整「氧氣填充」滑桿。網格中每一格代表 1%。如果目標是 50%，請將滑桿拉至 50。',
    requiresInteraction: true,
    interactionTarget: 'input-slider',
    interactionValue: 50,
  },
  {
    id: 'step4',
    target: 'impurity-toggle',
    title: '注意雜質與負重',
    content: '開啟「雜質模式」會模擬真實的生存挑戰（如廢料堆積）。雜質會佔用空間，你必須運用數學計算：目標量 - 雜質 = 你需要填充的量。',
    showCalculationHint: true,
  },
  {
    id: 'step5',
    target: 'apply-button',
    title: '精準執行',
    content: '當「當前 + 填充 + 雜質」的總和等於目標時，按下「執行 (Apply)」。精準的數學計算是生存的唯一保障！',
  },
]

function TutorialManager({ 
  currentStep, 
  onNext, 
  onSkip, 
  onComplete,
  targetPercentage,
  impurityPercentage,
  inputPercentage,
}) {
  const step = TUTORIAL_STEPS[currentStep]
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1

  // Check if interaction requirement is met
  const canProceed = step?.requiresInteraction 
    ? Math.abs(inputPercentage - (step.interactionValue || 0)) < 1
    : true

  return (
    <AnimatePresence>
      {step && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 pointer-events-auto"
          />

          {/* Highlighted Element Overlay - will be positioned by useEffect in App.jsx */}
          <TutorialHighlight target={step.target} />

          {/* Tutorial Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-slate-800 border-2 border-cyan-500 rounded-lg p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                    {step.title}
                  </h2>
                  <div className="text-sm text-slate-400">
                    步驟 {currentStep + 1} / {TUTORIAL_STEPS.length}
                  </div>
                </div>
                <button
                  onClick={onSkip}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-slate-200 leading-relaxed text-lg">
                  {step.content}
                </p>

                {/* Calculation Hint for Step 4 */}
                {step.showCalculationHint && impurityPercentage > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-emerald-900/30 border border-emerald-500/50 rounded-lg"
                  >
                    <div className="text-emerald-400 font-semibold text-sm mb-1">
                      即時計算提示：
                    </div>
                    <div className="text-emerald-300 text-base">
                      目標 {targetPercentage}% - 雜質 {impurityPercentage.toFixed(1)}% = 需填{' '}
                      <span className="font-bold">
                        {(targetPercentage - impurityPercentage).toFixed(1)}%
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onSkip}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  跳過教學
                </button>
                <button
                  onClick={isLastStep ? onComplete : onNext}
                  disabled={!canProceed}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold ${
                    canProceed
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLastStep ? '完成' : '下一步'}
                  {!isLastStep && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Interaction Hint */}
              {step.requiresInteraction && !canProceed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg text-yellow-400 text-sm text-center"
                >
                  請先將「氧氣填充」滑桿調整至 {step.interactionValue}% 才能繼續
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function useTutorial() {
  const [hasSeenTutorial, setHasSeenTutorial] = useLocalStorage('hasSeenTutorial', false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(!hasSeenTutorial)

  const startTutorial = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeTutorial()
    }
  }

  const skipTutorial = () => {
    completeTutorial()
  }

  const completeTutorial = () => {
    setIsActive(false)
    setHasSeenTutorial(true)
    setCurrentStep(0)
  }

  return {
    isActive,
    currentStep,
    startTutorial,
    nextStep,
    skipTutorial,
    completeTutorial,
  }
}

export default TutorialManager

