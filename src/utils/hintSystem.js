/**
 * 渐进式提示系统
 * 根据关卡和失败次数提供不同层次的提示
 */

export function getLevelHint(levelId, attemptCount, totalCells, targetPercentage, wasteCellsCount) {
  const hints = {
    A: [
      "💡 提示：記住 100 格代表 100%，每個格子是 1%",
      "💡 提示：需要填充的數量 = 總格數 × 百分比",
      "💡 詳細步驟：100 × 40% = 100 × 0.4 = 40 格"
    ],
    B: [
      "💡 提示：先計算 50 格的 40% 是多少",
      "💡 提示：50 × 40% = 50 × 0.4 = ?",
      `💡 詳細步驟：50 × 40% = 20 格，但注意紅色廢料格子（${wasteCellsCount} 格）已經存在！`
    ],
    C: [
      "💡 提示：80 格的 25% 相當於 80 ÷ 4",
      "💡 提示：80 ÷ 4 = 20 格",
      `💡 詳細步驟：80 × 25% = 20 格，廢料格子（${wasteCellsCount} 格）已經包含在總數中`
    ]
  }
  
  // 确保 attemptCount 在有效范围内
  const hintIndex = Math.min(Math.max(attemptCount - 1, 0), hints[levelId].length - 1)
  
  // 如果关卡不存在，返回默认提示
  if (!hints[levelId]) {
    return `💡 提示：計算 ${totalCells} 格的 ${targetPercentage}% 是多少格？`
  }
  
  return hints[levelId][hintIndex]
}

/**
 * 获取提示的层级说明
 */
export function getHintLevelDescription(attemptCount) {
  if (attemptCount === 1) {
    return "概念提示"
  } else if (attemptCount === 2) {
    return "計算提示"
  } else {
    return "詳細步驟"
  }
}
