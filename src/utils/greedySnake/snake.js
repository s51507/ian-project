import Vector from './vector.js'

export default class Snake {
  constructor(initialLength) {
    // 身體用陣列存
    this.body = []
    this.maxLength = initialLength
    this.head = new Vector()
    this.currentHeadDirection = new Vector(1, 0) // 目前的方向
    this.newHeadDirection = new Vector(1, 0) // 最新要變的方向
  }

  // 控制蛇移動
  update() {
    this.body.push(this.head)
    // 更新後再變更，以免快速按鍵時會出現反方向的情況
    const newHead = this.head.add(this.newHeadDirection)
    this.currentHeadDirection = this.newHeadDirection
    this.head = newHead

    while (this.body.length > this.maxLength) {
      this.body.shift()
    }
  }

  // 控制蛇的方向
  setDirection(dir) {
    let target
    switch (dir) {
      case 'ㄊ':
      case 'w':
      case 'W':
      case 'Up':
        target = new Vector(0, -1)
        break
      case 'ㄋ':
      case 's':
      case 'S':
      case 'Down':
        target = new Vector(0, 1)
        break
      case 'ㄇ':
      case 'a':
      case 'A':
      case 'Left':
        target = new Vector(-1, 0)
        break
      case 'ㄎ':
      case 'd':
      case 'D':
      case 'Right':
        target = new Vector(1, 0)
        break
      default:
        return
    }

    // 假如target和原本方向及相反方向不同
    if (!target.equal(this.currentHeadDirection) && !target.equal(this.currentHeadDirection.mul(-1))) {
      this.newHeadDirection = target
    }
  }

  // 確認蛇有沒有在遊戲範圍內
  checkBoundary(gameWidth) {
    const xRange = 0 <= this.head.x && this.head.x < gameWidth
    const yRange = 0 <= this.head.y && this.head.y < gameWidth
    return xRange && yRange
  }

  // 傻逼咬自己
  checkBiteSelf() {
    return this.body.some(e => this.head.equal(e))
  }

  // 無邊界模式要穿越邊框
  setNewHead(gameWidth) {
    let x = this.head.x
    let y = this.head.y
    // 方向往上
    if (this.currentHeadDirection.y === -1) y = gameWidth
    // 方向往下
    if (this.currentHeadDirection.y === 1) y = 0
    // 方向往左
    if (this.currentHeadDirection.x === -1) x = gameWidth
    // 方向往右
    if (this.currentHeadDirection.x === 1) x = 0
    this.head = new Vector(x, y)
  }
}