<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h1>Nanoleaf 佈局編輯器</h1>
      <div :class="$style.controls">
        <button @click="addPanel('triangle')" :class="$style.btn">+ 三角形</button>
        <button @click="addPanel('miniTriangle')" :class="$style.btn">+ 小三角形</button>
        <button @click="addPanel('hexagon')" :class="$style.btn">+ 六角形</button>
        <button @click="addPanel('square')" :class="$style.btn">+ 正方形</button>
        <button @click="clearAll" :class="[$style.btn, $style.btnDanger]">清空</button>
        <button @click="toggleAnimation" :class="$style.btn">
          {{ isAnimating ? '停止動畫' : '開始動畫' }}
        </button>
      </div>
    </div>

    <!-- 色系控制面板 -->
    <div :class="$style.colorPanel">
      <h3>🎨 色系控制</h3>
      
      <div :class="$style.colorSection">
        <h4>預設配色</h4>
        <div :class="$style.presetColors">
          <button 
            v-for="preset in colorPresets" 
            :key="preset.name"
            @click="applyColorPreset(preset)"
            :class="$style.presetBtn"
            :style="{ background: preset.preview }"
            :title="preset.name"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>

      <div :class="$style.colorSection">
        <h4>自訂色系</h4>
        <div :class="$style.colorControls">
          <div :class="$style.controlRow">
            <label>色相 (Hue):</label>
            <input 
              type="range" 
              v-model.number="customHue" 
              min="0" 
              max="360" 
              :class="$style.slider"
            />
            <span>{{ customHue }}°</span>
          </div>
          
          <div :class="$style.controlRow">
            <label>飽和度 (Saturation):</label>
            <input 
              type="range" 
              v-model.number="customSaturation" 
              min="0" 
              max="100" 
              :class="$style.slider"
            />
            <span>{{ customSaturation }}%</span>
          </div>
          
          <div :class="$style.controlRow">
            <label>亮度 (Lightness):</label>
            <input 
              type="range" 
              v-model.number="customLightness" 
              min="30" 
              max="80" 
              :class="$style.slider"
            />
            <span>{{ customLightness }}%</span>
          </div>

          <div :class="$style.controlRow">
            <div 
              :class="$style.colorPreview" 
              :style="{ background: customColorPreview }"
            ></div>
            <button @click="applyCustomColor('all')" :class="$style.btn">套用到全部</button>
            <button 
              @click="applyCustomColor('selected')" 
              :class="$style.btn"
              :disabled="!selectedPanel"
            >
              套用到選中
            </button>
          </div>
        </div>
      </div>
    </div>

    <div 
      :class="$style.canvas" 
      ref="canvas"
      @mousedown="onCanvasMouseDown"
      @mousemove="onCanvasMouseMove"
      @mouseup="onCanvasMouseUp"
    >
      <svg 
        :width="canvasWidth" 
        :height="canvasHeight"
        :class="$style.svg"
      >
        <!-- 網格背景 -->
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)"/>
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <!-- 吸附點預覽 -->
        <circle 
          v-if="snapPreview"
          :cx="snapPreview.x"
          :cy="snapPreview.y"
          r="6"
          fill="none"
          stroke="#4CAF50"
          stroke-width="2"
          :class="$style.snapPreview"
        />

        <!-- 燈板 -->
        <g 
          v-for="panel in panels" 
          :key="panel.id"
          :transform="`translate(${panel.x}, ${panel.y}) rotate(${panel.rotation})`"
          @mousedown.stop="startDrag(panel, $event)"
          :class="$style.panel"
        >
          <!-- 三角形 -->
          <polygon 
            v-if="panel.type === 'triangle'"
            :points="getTrianglePoints(panel.size)"
            :fill="panel.color"
            :stroke="selectedPanel?.id === panel.id ? '#fff' : '#333'"
            stroke-width="2"
            :class="$style.shape"
          />
          
          <!-- 小三角形 -->
          <polygon 
            v-if="panel.type === 'miniTriangle'"
            :points="getTrianglePoints(panel.size)"
            :fill="panel.color"
            :stroke="selectedPanel?.id === panel.id ? '#fff' : '#333'"
            stroke-width="2"
            :class="$style.shape"
          />
          
          <!-- 六角形 -->
          <polygon 
            v-if="panel.type === 'hexagon'"
            :points="getHexagonPoints(panel.size)"
            :fill="panel.color"
            :stroke="selectedPanel?.id === panel.id ? '#fff' : '#333'"
            stroke-width="2"
            :class="$style.shape"
          />
          
          <!-- 正方形 -->
          <rect 
            v-if="panel.type === 'square'"
            :x="-panel.size/2"
            :y="-panel.size/2"
            :width="panel.size"
            :height="panel.size"
            :fill="panel.color"
            :stroke="selectedPanel?.id === panel.id ? '#fff' : '#333'"
            stroke-width="2"
            :class="$style.shape"
          />
          
          <!-- 旋轉控制點 -->
          <circle
            v-if="selectedPanel?.id === panel.id"
            :cx="0"
            :cy="-panel.size - 20"
            r="8"
            fill="#4CAF50"
            :class="$style.rotateHandle"
            @mousedown.stop="startRotate(panel, $event)"
          />
        </g>
      </svg>
    </div>

    <div :class="$style.info" v-if="selectedPanel">
      <h3>已選擇: {{ getPanelTypeName(selectedPanel.type) }}</h3>
      <div :class="$style.infoRow">
        <label>旋轉角度:</label>
        <input 
          type="number" 
          v-model.number="selectedPanel.rotation" 
          @input="updateRotation"
          :class="$style.input"
        />
        <button @click="rotatePanel(60)" :class="$style.btnSmall">+60°</button>
        <button @click="rotatePanel(-60)" :class="$style.btnSmall">-60°</button>
      </div>
      <div :class="$style.infoRow">
        <button @click="deletePanel" :class="[$style.btn, $style.btnDanger]">刪除</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getTrianglePoints, getHexagonPoints } from '@/utils/nanoleaf/geometry'
import { checkSnapping } from '@/utils/nanoleaf/snapping'
import { SIZES, PANEL_TYPE_NAMES, CANVAS_WIDTH, CANVAS_HEIGHT } from '@/utils/nanoleaf/constants'
import { COLOR_PRESETS, getRandomColor, applyPresetToPanels, applyCustomColorToPanels } from '@/utils/nanoleaf/colorPresets'

export default {
  setup() {
    const canvas = ref(null)
    const canvasWidth = ref(CANVAS_WIDTH)
    const canvasHeight = ref(CANVAS_HEIGHT)
    const panels = ref([])
    const selectedPanel = ref(null)
    const draggingPanel = ref(null)
    const rotatingPanel = ref(null)
    const dragOffset = ref({ x: 0, y: 0 })
    const isAnimating = ref(false)
    const animationFrame = ref(null)
    const snapPreview = ref(null)
    let panelIdCounter = 0

    // 色系控制
    const customHue = ref(180)
    const customSaturation = ref(80)
    const customLightness = ref(60)
    const colorPresets = ref(COLOR_PRESETS)

    // 計算自訂顏色預覽
    const customColorPreview = computed(() => {
      return `hsl(${customHue.value}, ${customSaturation.value}%, ${customLightness.value}%)`
    })

    // 新增燈板
    const addPanel = (type) => {
      const panel = {
        id: panelIdCounter++,
        type,
        x: canvasWidth.value / 2 + Math.random() * 200 - 100,
        y: canvasHeight.value / 2 + Math.random() * 200 - 100,
        rotation: 0,
        size: SIZES[type],
        color: getRandomColor(),
        hue: Math.random() * 360
      }
      panels.value.push(panel)
      selectedPanel.value = panel
    }

    // 開始拖拽
    const startDrag = (panel, event) => {
      draggingPanel.value = panel
      selectedPanel.value = panel
      const rect = canvas.value.getBoundingClientRect()
      dragOffset.value = {
        x: event.clientX - rect.left - panel.x,
        y: event.clientY - rect.top - panel.y
      }
    }

    // 開始旋轉
    const startRotate = (panel, event) => {
      event.stopPropagation()
      rotatingPanel.value = panel
      selectedPanel.value = panel
    }

    // 畫布滑鼠移動
    const onCanvasMouseMove = (event) => {
      if (draggingPanel.value) {
        const rect = canvas.value.getBoundingClientRect()
        draggingPanel.value.x = event.clientX - rect.left - dragOffset.value.x
        draggingPanel.value.y = event.clientY - rect.top - dragOffset.value.y
        
        // 檢查吸附
        checkSnapping(draggingPanel.value, panels, snapPreview)
      } else if (rotatingPanel.value) {
        const rect = canvas.value.getBoundingClientRect()
        const centerX = rect.left + rotatingPanel.value.x
        const centerY = rect.top + rotatingPanel.value.y
        const angle = Math.atan2(
          event.clientY - centerY,
          event.clientX - centerX
        ) * (180 / Math.PI) + 90
        rotatingPanel.value.rotation = Math.round(angle / 15) * 15 // 15度為單位
      }
    }

    // 畫布滑鼠放開
    const onCanvasMouseUp = () => {
      draggingPanel.value = null
      rotatingPanel.value = null
      snapPreview.value = null
    }

    // 畫布滑鼠按下（取消選擇）
    const onCanvasMouseDown = (event) => {
      if (event.target === canvas.value || event.target.tagName === 'svg') {
        selectedPanel.value = null
      }
    }

    // 旋轉燈板
    const rotatePanel = (degrees) => {
      if (selectedPanel.value) {
        selectedPanel.value.rotation = (selectedPanel.value.rotation + degrees) % 360
      }
    }

    // 更新旋轉
    const updateRotation = () => {
      if (selectedPanel.value) {
        selectedPanel.value.rotation = selectedPanel.value.rotation % 360
      }
    }

    // 刪除燈板
    const deletePanel = () => {
      if (selectedPanel.value) {
        const index = panels.value.findIndex(p => p.id === selectedPanel.value.id)
        if (index > -1) {
          panels.value.splice(index, 1)
          selectedPanel.value = null
        }
      }
    }

    // 清空全部
    const clearAll = () => {
      if (confirm('確定要清空所有燈板嗎？')) {
        panels.value = []
        selectedPanel.value = null
      }
    }

    // 切換動畫
    const toggleAnimation = () => {
      isAnimating.value = !isAnimating.value
      if (isAnimating.value) {
        animate()
      } else {
        if (animationFrame.value) {
          cancelAnimationFrame(animationFrame.value)
        }
      }
    }

    // 動畫循環
    const animate = () => {
      panels.value.forEach(panel => {
        panel.hue = (panel.hue + 0.5) % 360
        panel.color = `hsl(${panel.hue}, 80%, 60%)`
      })
      
      if (isAnimating.value) {
        animationFrame.value = requestAnimationFrame(animate)
      }
    }

    // 獲取燈板類型名稱
    const getPanelTypeName = (type) => {
      return PANEL_TYPE_NAMES[type] || type
    }

    // 應用預設配色
    const applyColorPreset = (preset) => {
      applyPresetToPanels(panels.value, preset)
    }

    // 應用自訂顏色
    const applyCustomColor = (target) => {
      applyCustomColorToPanels(
        panels.value,
        selectedPanel.value,
        customHue.value,
        customSaturation.value,
        customLightness.value,
        target
      )
    }

    onMounted(() => {
      // 初始化一些燈板
      addPanel('hexagon')
      addPanel('triangle')
      addPanel('square')
    })

    onUnmounted(() => {
      if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value)
      }
    })

    return {
      canvas,
      canvasWidth,
      canvasHeight,
      panels,
      selectedPanel,
      isAnimating,
      snapPreview,
      customHue,
      customSaturation,
      customLightness,
      customColorPreview,
      colorPresets,
      addPanel,
      startDrag,
      startRotate,
      onCanvasMouseMove,
      onCanvasMouseUp,
      onCanvasMouseDown,
      rotatePanel,
      updateRotation,
      deletePanel,
      clearAll,
      toggleAnimation,
      getTrianglePoints,
      getHexagonPoints,
      getPanelTypeName,
      applyColorPreset,
      applyCustomColor
    }
  }
}
</script>

<style lang="scss" module>
.container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 15px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    background: linear-gradient(45deg, #4CAF50, #2196F3, #E91E63);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.colorPanel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    margin: 0 0 15px 0;
    font-size: 1.3rem;
  }

  h4 {
    margin: 0 0 10px 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
}

.colorSection {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.presetColors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.presetBtn {
  padding: 10px 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.colorControls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.controlRow {
  display: flex;
  gap: 15px;
  align-items: center;

  label {
    min-width: 160px;
    font-weight: 600;
    font-size: 14px;
  }

  span {
    min-width: 50px;
    text-align: right;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    border: none;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
}

.colorPreview {
  width: 60px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.btnDanger {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  
  &:hover {
    box-shadow: 0 5px 20px rgba(245, 87, 108, 0.4);
  }
}

.btnSmall {
  padding: 5px 10px;
  background: #4CAF50;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #45a049;
  }
}

.canvas {
  flex: 1;
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.svg {
  cursor: move;
}

.panel {
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
}

.shape {
  transition: fill 0.3s ease;
  filter: drop-shadow(0 0 10px currentColor);
  
  &:hover {
    filter: drop-shadow(0 0 20px currentColor);
  }
}

.rotateHandle {
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    r: 10;
    fill: #66BB6A;
  }
}

.snapPreview {
  animation: snapPulse 0.6s ease-in-out infinite;
}

@keyframes snapPulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

.info {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  
  h3 {
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
}

.infoRow {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  
  label {
    font-weight: 600;
    min-width: 80px;
  }
}

.input {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-size: 14px;
  width: 80px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
}
</style>
