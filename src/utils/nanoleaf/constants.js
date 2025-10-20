// Nanoleaf 常數定義

// 形狀尺寸（統一邊長）
export const EDGE_LENGTH = 100  // 基準邊長

export const SIZES = {
  triangle: EDGE_LENGTH,      // 三角形：size = 邊長
  miniTriangle: EDGE_LENGTH / 2,  // 小三角形：邊長是三角形的一半
  hexagon: EDGE_LENGTH,       // 六角形：size = 外接圓半徑 = 邊長
  square: EDGE_LENGTH         // 正方形：size = 邊長
}

// 形狀類型名稱
export const PANEL_TYPE_NAMES = {
  triangle: '三角形',
  miniTriangle: '小三角形',
  hexagon: '六角形',
  square: '正方形'
}

// 畫布尺寸
export const CANVAS_WIDTH = 1200
export const CANVAS_HEIGHT = 800

