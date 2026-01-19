import { motion } from 'framer-motion'
import { Clock, AlertCircle } from 'lucide-react'

function CountdownBar({ timeRemaining, timeLimit, missionFailed }) {
  const percentage = (timeRemaining / timeLimit) * 100
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLowTime = timeRemaining <= 10

  return (
    <div className="w-full bg-slate-800/50 rounded-lg p-2 border border-white/10">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Clock className={`w-3 h-3 ${
            percentage > 50 ? 'text-emerald-400' : 
            percentage > 25 ? 'text-yellow-400' : 
            'text-red-400'
          }`} />
          <span className="text-xs font-semibold text-slate-300">
            剩餘時間
          </span>
        </div>
        <div className={`text-sm font-bold font-mono ${
          percentage > 50 ? 'text-emerald-400' : 
          percentage > 25 ? 'text-yellow-400' : 
          'text-red-400'
        }`}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      
      <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full rounded-full transition-colors ${
            percentage > 50 ? 'bg-emerald-500' : 
            percentage > 25 ? 'bg-yellow-500' : 
            'bg-red-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
        {missionFailed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <AlertCircle className="w-3 h-3 text-red-400" />
          </motion.div>
        )}
      </div>
      
      {missionFailed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-center text-red-400 text-xs font-semibold"
        >
          任務失敗！時間已用盡
        </motion.div>
      )}
    </div>
  )
}

export default CountdownBar
