<template>
  <div class="panel">
    <h2>Score: 0</h2>
    <p>*提示:吃到綠色方塊不會增加蛇移動的速度，但紅色方塊會</p>
    <button @click="game.startGame()">Start Game</button>
  </div>
  <canvas id="mycanvas"></canvas>
</template>

<script>
import { ref } from 'vue'
import Game from '@/utils/greedySnake/game.js'

export default {
  setup() {
    const game = ref(null)
    return {
      game,
    }
  },
  methods: {

  },
  beforeMount() {
  },
  mounted() {
    const config = {
      bw: 12, // block寬度
      bs: 2, // block邊框
      gameWidth: 40, // 長寬各有幾個格子
      speed: 100,
      foodCount: 20, // 食物數量
      baseSpeed: 40, // 基礎速度
    }
    this.game = new Game(config)

    //按鍵監聽
    window.addEventListener('keydown', (evt) => {
      this.game.snake.setDirection(evt.key.replace('Arrow', ''))
    })
  },
}
</script>

<style lang="scss">
canvas {
  max-height: 100vh
}
  
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
  h2 {
    margin-bottom: 0;
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
</style>
