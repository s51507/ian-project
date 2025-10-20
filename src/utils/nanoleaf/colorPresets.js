// Nanoleaf 配色方案

export const COLOR_PRESETS = [
  {
    name: '暖色調',
    preview: 'linear-gradient(90deg, #ff6b6b, #ee5a6f, #c44569)',
    hues: [0, 340, 320]
  },
  {
    name: '冷色調',
    preview: 'linear-gradient(90deg, #4facfe, #00f2fe, #43e97b)',
    hues: [200, 180, 160]
  },
  {
    name: '日落',
    preview: 'linear-gradient(90deg, #fa709a, #fee140, #30cfd0)',
    hues: [340, 45, 180]
  },
  {
    name: '森林',
    preview: 'linear-gradient(90deg, #38ef7d, #11998e, #0f9b0f)',
    hues: [120, 160, 110]
  },
  {
    name: '紫羅蘭',
    preview: 'linear-gradient(90deg, #a8edea, #fed6e3, #d299c2)',
    hues: [280, 320, 300]
  },
  {
    name: '彩虹',
    preview: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    hues: [0, 30, 60, 120, 240, 270, 300]
  },
  {
    name: '極光',
    preview: 'linear-gradient(90deg, #a8ff78, #78ffd6, #a8edea)',
    hues: [100, 160, 180]
  },
  {
    name: '火焰',
    preview: 'linear-gradient(90deg, #ff9a56, #ff6a00, #ee0979)',
    hues: [20, 30, 340]
  }
]

// 獲取隨機顏色
export const getRandomColor = () => {
  const hue = Math.random() * 360
  return `hsl(${hue}, 80%, 60%)`
}

// 應用預設配色到燈板陣列
export const applyPresetToPanels = (panels, preset) => {
  if (panels.length === 0) return

  panels.forEach((panel, index) => {
    const hueIndex = index % preset.hues.length
    const hue = preset.hues[hueIndex]
    panel.hue = hue
    panel.color = `hsl(${hue}, 80%, 60%)`
  })
}

// 應用自訂顏色到燈板
export const applyCustomColorToPanels = (panels, selectedPanel, hue, saturation, lightness, target) => {
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`

  if (target === 'all') {
    panels.forEach(panel => {
      panel.hue = hue
      panel.color = color
    })
  } else if (target === 'selected' && selectedPanel) {
    selectedPanel.hue = hue
    selectedPanel.color = color
  }
}

