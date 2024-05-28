<template>
  <div :class="$style.main">
    <div :class="$style.game">
      <div :class="$style.panel">
        <h2>Score: 0</h2>
        <p>*提示:吃到綠色方塊不會增加蛇移動的速度，但紅色方塊會</p>
        <button @click="game.startGame()">Start Game</button>
      </div>
      <canvas id="snakeCanvas"></canvas>
    </div>
    <div :class="$style.console">
      <div :class="$style.row">
        <div>無邊界模式（撞牆不會死）</div>
        <input v-model="borderless" type="checkbox" />
      </div>
      <div :class="$style.row">
        <div>靜音</div>
        <input v-model="mute" type="checkbox" />
      </div>
      <div :class="$style.row">
        <div>咬到自己要不要結束遊戲</div>
        <input v-model="biteSelf" type="checkbox" />
      </div>
      <div :class="$style.row">
        <div>G8模式</div>
        <input v-model="g8Mode" type="checkbox" />
      </div>
      <div :class="$style.row">
        <div>G8模式時間間隔（秒）</div>
        <input v-model="g8ModeTime" />
      </div>
      <div :class="$style.row">
        <div>block寬度</div>
        <input v-model="bw" />
      </div>
      <div :class="$style.row">
        <div>block邊框</div>
        <input v-model="bs" />
      </div>
      <div :class="$style.row">
        <div>長寬各有幾個格子</div>
        <input v-model="gameWidth" />
      </div>
      <div :class="$style.row">
        <div>蛇蛇初始長度</div>
        <input v-model="snakeInitialLength" />
      </div>
      <div :class="$style.row">
        <div>基礎速度</div>
        <input v-model="baseSpeed" />
      </div>
      <div :class="$style.row">
        <div>食物數量</div>
        <input v-model="foodCount" />
      </div>
      <IcBtn :class="$style.btn" color="white" @click="updateGameConfig"> 套用設定 </IcBtn>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Game from '@/utils/greedySnake/game.js'

export default {
  setup() {
    const bw = ref(12) // block寬度
    const bs = ref(2) // block邊框
    const gameWidth = ref(40) // 長寬各有幾個格子
    const baseSpeed = ref(40) // 基礎速度
    const foodCount = ref(20) // 食物數量
    const borderless = ref(false) // 無邊界模式（撞牆不會死
    const mute = ref(true) // 靜音
    const biteSelf = ref(true) // 咬到自己要不要結束遊戲
    const snakeInitialLength = ref(5) // 蛇蛇初始長度
    const g8Mode = ref(false) // 會隨機換方向
    const g8ModeTime = ref(5) // 要幾秒隨機一次
    const game = ref(null)

    return {
      bw,
      bs,
      gameWidth,
      baseSpeed,
      foodCount,
      borderless,
      mute,
      biteSelf,
      snakeInitialLength,
      g8Mode,
      g8ModeTime,
      game,
    }
  },
  computed: {
    gameConfig() {
      return {
        bw: this.bw,
        bs: this.bs,
        gameWidth: this.gameWidth,
        baseSpeed: this.baseSpeed,
        foodCount: this.foodCount,
        targetPanel: `.${this.$style.panel}`,
        borderless: this.borderless,
        mute: this.mute,
        biteSelf: this.biteSelf,
        snakeInitialLength: this.snakeInitialLength,
        g8Mode: this.g8Mode,
        g8ModeTime: this.g8ModeTime,
      }
    }
  },
  methods: {
    updateGameConfig() {
      this.game.setConfig(this.gameConfig)
    },
    createGame() {
      this.game = new Game(this.gameConfig)

      //按鍵監聽
      window.addEventListener('keydown', (evt) => {
        this.game.snake.setDirection(evt.key.replace('Arrow', ''))
      })
    }
  },
  beforeMount() {
  },
  mounted() {
    this.createGame()
  },
}
</script>

<style lang="scss" module>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .game {
    position: relative;
    margin-right: 10px;
    .panel {
      position: absolute;
      top: 50%;
      left: 100px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 10;
      h2, p {
        margin-bottom: 8px;
      }
      button {
        background-color: transparent;
        border: 1px solid #fff;
        border-radius: 20px;
        padding: 5px 10px;
        color: #fff;
        cursor: pointer;
        outline: none;
        &:hover {
          background-color: #fff;
          color: black;
        }
      }
    }
    canvas {
      max-height: 100vh
    }
  }
  .console {
    & > .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      & > div:first-child {
        margin-right: 8px;
      }
    }
  }
}
</style>
