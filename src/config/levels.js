export const LEVELS = {
  A: {
    id: 'A',
    name: '基礎關卡',
    description: '學習 1% = 1 格的基本概念',
    totalCells: 100,
    gridCols: 10,
    gridRows: 10,
    targetPercentage: 40,
    wastePercentage: 0,
    timeLimit: 60, // seconds
    goal: '理解 1% = 1 格',
  },
  B: {
    id: 'B',
    name: '進階關卡',
    description: '縮小基數，練習計算基準量',
    totalCells: 50,
    gridCols: 10,
    gridRows: 5,
    targetPercentage: 40,
    wastePercentage: 10, // 5 cells out of 50 = 10%
    timeLimit: 45, // seconds
    goal: '計算總格數，然後減去廢料格數',
  },
  C: {
    id: 'C',
    name: '挑戰關卡',
    description: '放大基數，挑戰複雜計算',
    totalCells: 80,
    gridCols: 10,
    gridRows: 8,
    targetPercentage: 25,
    wastePercentage: 10, // 8 cells out of 80 = 10%
    timeLimit: 30, // seconds
    goal: '計算總格數，然後減去廢料格數',
  },
}

export function getLevelConfig(levelId) {
  return LEVELS[levelId] || LEVELS.A
}

export function calculateWasteCells(totalCells, wastePercentage) {
  return Math.round((wastePercentage / 100) * totalCells)
}

export function calculateTargetCells(totalCells, targetPercentage) {
  return Math.round((targetPercentage / 100) * totalCells)
}

