import { motion } from 'framer-motion'
import { CheckCircle, Minus, Plus } from 'lucide-react'

function ControlPanel({
  targetPercentage,
  inputPercentage,
  wasteCellsCount,
  selectedCount,
  levelConfig,
  onInputChange,
  onSliderChange,
  onApply,
}) {
  const handleApply = () => {
    if (onApply) {
      onApply()
    }
  }

  // Calculate slider cells for display
  const sliderCells = Math.round((inputPercentage / 100) * levelConfig.totalCells)
  // Ensure totalSelected matches sliderCells exactly
  // sliderCells represents the current slider value, which should match selectedCount
  // Use sliderCells to ensure consistency with the slider display
  const totalSelected = sliderCells
  const totalCount = totalSelected + wasteCellsCount
  
  // Calculate required cells for button state
  const requiredCells = Math.round((levelConfig.totalCells * targetPercentage) / 100)
  const isNearTarget = Math.abs(totalCount - requiredCells) < 0.5

  // Slider adjustment functions
  const adjustSlider = (delta) => {
    const currentCells = Math.round((inputPercentage / 100) * levelConfig.totalCells)
    const newCells = Math.max(0, Math.min(levelConfig.totalCells, currentCells + delta))
    const percentage = (newCells / levelConfig.totalCells) * 100
    onInputChange(percentage)
    if (onSliderChange) {
      onSliderChange(percentage)
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ position: 'relative' }}>
      {/* Current Tank Capacity - At Top with Neon Border */}
      <div className="mb-6 p-4 bg-slate-900/30 rounded-lg border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
        <div className="text-center">
          <div className="text-xs text-slate-400 mb-1 font-mono">當前儲氣槽容量</div>
          <div className="text-3xl font-bold text-cyan-400 font-mono">
            {levelConfig.totalCells} 格
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {levelConfig.gridCols} × {levelConfig.gridRows} 網格
          </div>
        </div>
      </div>

      {/* Target Lock Zone - Deep Red/Orange Alert */}
      <div className="mb-6 p-4 bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-lg border border-red-500/50 shadow-lg shadow-red-500/20">
        <div className="text-center">
          <div className="text-xs text-red-300 mb-2 font-mono">任務需求</div>
          <div className="text-2xl font-bold text-red-200 font-mono">
            達成總量的 {targetPercentage}%
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Statistics Panel - Table Alignment */}
        <div className="p-4 bg-slate-900/30 rounded-lg border border-white/10">
          <div className="space-y-3">
            {/* Merged Display: Total Selected */}
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">總計已選：</span>
              <span className="text-cyan-400 font-mono font-bold">{totalSelected} 格</span>
            </div>
            {wasteCellsCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">廢料（已鎖定）：</span>
                <span className="text-red-400 font-mono font-bold">{wasteCellsCount} 格</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-3 flex justify-between items-center">
              <span className="text-slate-200 font-semibold">總計填充：</span>
              <span className="text-cyan-400 font-mono font-bold text-lg">
                {totalCount} / {levelConfig.totalCells} 格
              </span>
            </div>
          </div>
        </div>

        {/* Fill Control - Thicker Slider with +/- Buttons */}
        <div className="p-4 bg-slate-900/30 rounded-lg border border-white/10">
          <label className="block text-sm font-semibold text-slate-300 mb-4 text-center">
            填充格數
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustSlider(-1)}
              className="w-10 h-10 flex items-center justify-center bg-slate-800 border border-white/10 rounded hover:bg-slate-700 transition-colors text-cyan-400"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="0"
              max={levelConfig.totalCells}
              value={sliderCells}
              onChange={(e) => {
                const cellCount = Number(e.target.value)
                const percentage = (cellCount / levelConfig.totalCells) * 100
                onInputChange(percentage)
                if (onSliderChange) {
                  onSliderChange(percentage)
                }
              }}
              className="flex-1 h-6 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 border border-white/10"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${(inputPercentage / 100) * 100}%, #1e293b ${(inputPercentage / 100) * 100}%, #1e293b 100%)`
              }}
            />
            <button
              onClick={() => adjustSlider(1)}
              className="w-10 h-10 flex items-center justify-center bg-slate-800 border border-white/10 rounded hover:bg-slate-700 transition-colors text-cyan-400"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div className="w-20 px-3 py-2 bg-slate-800 border border-white/10 rounded text-center text-cyan-400 font-bold font-mono text-lg">
              {sliderCells}
            </div>
            <span className="text-slate-400 text-sm font-semibold">格</span>
          </div>
        </div>
      </div>

      {/* Apply Button - Fixed at Bottom with State Sensing */}
      <div className="mt-6 pt-4 border-t border-white/10" style={{ position: 'sticky', bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.95)', zIndex: 50 }}>
        <button
          id="apply-button"
          onClick={handleApply}
          className={`w-full px-6 py-4 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 border ${
            isNearTarget
              ? 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse'
              : 'bg-slate-700 hover:bg-slate-600 border-white/10'
          }`}
          style={{
            display: 'flex !important',
            opacity: '1 !important',
            visibility: 'visible !important',
            minHeight: '56px',
            fontSize: '18px',
          }}
        >
          <CheckCircle className="w-6 h-6" />
          <span className="font-mono">{isNearTarget ? '✓ 執行（已達標）' : '執行'}</span>
        </button>
      </div>
    </div>
  )
}

export default ControlPanel
