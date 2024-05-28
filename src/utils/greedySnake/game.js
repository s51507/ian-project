import * as Tone from 'tone'
import Vector from './vector.js'
import Snake from './snake.js'

export default class Game {
  constructor(conf) {
    const config = {
      bw: 12,
      bs: 2,
      gameWidth: 40,
      speed: 30,
      baseSpeed: 5,
      foodCount: 4,
      ...conf
    }
    this.bw = config.bw // block寬度
    this.bs = config.bs // block邊框
    this.gameWidth = config.gameWidth // 長寬各有幾個格子
    this.speed = config.speed
    this.baseSpeed = config.baseSpeed // 基礎速度
    this.foodCount = config.foodCount // 食物數量
    this.snake = new Snake()
    this.foods = []
    this.start = false
    this.init()
  }

  init() {
    this.canvas = document.getElementById('mycanvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = this.bw * this.gameWidth + this.bs * (this.gameWidth - 1)
    this.canvas.height = this.canvas.width
    this.render() // 先呼叫渲染畫面
    setTimeout(() => {
      this.update()
    }, 30)
    this.manyFoods(this.foodCount)
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for (let x = 0; x < this.gameWidth; x++) {
      for (let y = 0; y < this.gameWidth; y++) {
        this.drawBlock(new Vector(x, y),'rgba(255, 255, 255, 0.03)')
      }
    }
    this.snake.body.forEach(sp => {
      this.drawBlock(sp, '#fff')
    })
    for (let i = 0; i < this.foods.length; i++) {
      this.drawBlock(this.foods[0], 'green')
      this.drawBlock(this.foods[i], 'red')
    }
    requestAnimationFrame(() => this.render()) // 必須重複執行render這個函數
  }

  startGame() {
    this.start = true
    this.snake = new Snake() // 遊戲開始都會產生新的蛇
    document.querySelector('.panel').style.display = 'none'
    this.update()
    this.playSound('C#5', -20)
    this.playSound('E5', -20, 200)
  }

  endGame() {
    this.start = false
    document.querySelector('.panel').style.display = ''
    document.querySelector('h2').textContent = `Score: ${(this.snake.body.length - 5) * 10}`
    this.playSound('A3')
    this.playSound('E2', -10, 200)
    this.playSound('A2', -10, 400)
  }

  // 更新遊戲內容
  update() {
    // 遊戲還沒開始就直接return
    if (!this.start) return

    this.snake.update() // 更新蛇的移動位置
    this.foods.forEach((food, i) => {
      if (this.snake.head.equal(food)) {
        // 蛇的頭和食物位置一樣
        this.snake.maxLength++
        this.foods.splice(i, 1)
        this.generateFood()
      }
    })
    
    if (!this.snake.checkBoundary(this.gameWidth)){
      this.endGame()
    }
    this.speed = Math.sqrt(this.snake.body.length) + this.baseSpeed
    setTimeout(() => {
      this.update()
    }, parseInt(1000 / this.speed)) // 固定時間呼叫update函式
    this.playSound('A2', -25)
  }

  // 獲取方塊位置
  getPosition(x, y) {
    return new Vector(x * this.bw + (x - 1) * this.bs, y * this.bw + (y - 1) * this.bs)
  }

  // 畫出方塊
  drawBlock(v, color) {
    this.ctx.fillStyle = color
    const pos = this.getPosition(v.x, v.y)
    this.ctx.fillRect(pos.x, pos.y, this.bw, this.bw)
  }

  // 畫出食物產生時的紅圈
  drawEffect(x, y) {
    let r = 2
    const pos = this.getPosition(x, y)
    const effect = () => {
      r++
      this.ctx.strokeStyle= `rgba(255, 255, 255, ${(100 - r) / 100})`
      this.ctx.beginPath()
      this.ctx.arc(pos.x + this.bw / 2, pos.y + this.bw / 2, 20 * Math.log(r / 2), 0, Math.PI * 2)
      this.ctx.stroke()
      if (r < 100) {
        requestAnimationFrame(effect)
      }
    }
    requestAnimationFrame(effect)
  }

  // 產生食物
  generateFood() {
    const x = Math.floor(Math.random() * this.gameWidth)
    const y = Math.floor(Math.random() * this.gameWidth)
    this.foods.push(new Vector(x, y)) // foods為陣列
    this.drawEffect(x, y)
    this.playSound('E5', -20)
    this.playSound('A5', -20, 200)
  }

  // 製造多個食物
  manyFoods(count = 2) {
    for (let i = 0; i < count; i++) {
      this.generateFood()
    }
  }

  // 產生聲音
  playSound(note, volume = -12, when = 0) {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      const synth= new Tone.Synth().toMaster()
      synth.volume.value= volume
      synth.triggerAttackRelease(note, '8n')
    }, when) // 第一個參數:音符，第二個參數:聲音持續時間
  }
}