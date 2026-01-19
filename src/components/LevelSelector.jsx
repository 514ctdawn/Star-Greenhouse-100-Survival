import { motion } from 'framer-motion'
import { Trophy, Target, Clock } from 'lucide-react'
import { LEVELS } from '../config/levels'

function LevelSelector({ currentLevel, onLevelChange, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-slate-800 border-2 border-cyan-500 rounded-lg p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
          選擇關卡
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(LEVELS).map((level) => (
            <motion.button
              key={level.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onLevelChange(level.id)
                onClose()
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                currentLevel === level.id
                  ? 'border-cyan-500 bg-cyan-500/20'
                  : 'border-slate-700 bg-slate-700/50 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Trophy className={`w-6 h-6 ${
                  level.id === 'A' ? 'text-emerald-400' :
                  level.id === 'B' ? 'text-yellow-400' :
                  'text-red-400'
                }`} />
                <span className={`text-sm font-bold ${
                  currentLevel === level.id ? 'text-cyan-400' : 'text-slate-400'
                }`}>
                  {level.id === currentLevel && '✓ 當前'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-200 mb-1">
                {level.name}
              </h3>
              
              <p className="text-sm text-slate-400 mb-3">
                {level.description}
              </p>
              
              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  <span>總容量：{level.totalCells} 格</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  <span>目標：{level.targetPercentage}%</span>
                </div>
                {level.wastePercentage > 0 && (
                  <div className="flex items-center gap-2 text-red-400">
                    <Target className="w-3 h-3" />
                    <span>廢料：{level.wastePercentage}%</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>時間：{level.timeLimit}秒</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LevelSelector

