import { motion } from 'framer-motion'
import { Wind, Zap, Trash2 } from 'lucide-react'

function Meter({ label, value, icon: Icon, color }) {
  const percentage = Math.max(0, Math.min(100, value))
  
  return (
    <div className="flex-1 bg-slate-800/50 rounded-lg p-2 sm:p-4 border border-white/10">
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
          <span className="text-xs sm:text-sm font-semibold text-slate-300">{label}</span>
        </div>
        {/* 右端圖標 */}
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${color.replace('text-', 'bg-').replace('-400', '-500/20')}`}>
          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${color}`} />
        </div>
      </div>
      <div className="relative h-3 sm:h-4 bg-slate-900 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full ${color.replace('text-', 'bg-')} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
        {/* 移除百分比数字，只保留视觉条 */}
      </div>
    </div>
  )
}

function TopBar({ oxygen, power, bioWaste }) {
  return (
    <div 
      id="topbar"
      data-tutorial-target="topbar"
      className="bg-slate-800 border-b border-white/10 p-2 sm:p-4 relative z-30"
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Meter 
          label="氧氣" 
          value={oxygen} 
          icon={Wind} 
          color="text-cyan-400" 
        />
        <Meter 
          label="電力" 
          value={power} 
          icon={Zap} 
          color="text-emerald-400" 
        />
        <Meter 
          label="生物廢料" 
          value={bioWaste} 
          icon={Trash2} 
          color="text-red-400" 
        />
      </div>
    </div>
  )
}

export default TopBar
