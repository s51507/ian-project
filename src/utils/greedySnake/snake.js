import Vector from './vector.js'

export default class Snake {
  constructor() {
    // 身體用陣列存
    this.body = []
    this.maxLength = 5
    this.head = new Vector()
    this.speed = new Vector(1, 0)
    this.direction = 'Right'
  }

  // 控制蛇移動
  update() {
    this.body.push(this.head)
    const newHead = this.head.add(this.speed)
    this.head = newHead
    while (this.body.length > this.maxLength) {
      this.body.shift()
    }
  }

  // 控制蛇的方向
  setDirection(dir) {
    let target
    if (dir === 'Up') {
      target= new Vector(0, -1)
    } else if (dir === 'Down') {
      target= new Vector(0, 1)
    } else if (dir === 'Left') {
      target= new Vector(-1, 0)
    } else if (dir === 'Right') {
      target= new Vector(1, 0)
    }

    // 假如target和原本方向及相反方向不同
    if (!target.equal(this.speed) && !target.equal(this.speed.mul(-1))) {
      this.speed = target
    }
  }

  // 確認蛇有沒有撞到邊界
  checkBoundary(gameWidth) {
    const xRange = 0 <= this.head.x && this.head.x < gameWidth
    const yRange = 0 <= this.head.y && this.head.y < gameWidth
    return xRange && yRange
  }
}