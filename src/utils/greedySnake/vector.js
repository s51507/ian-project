// 向量的class
export default class Vector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y)
  }

  length() {
    return Math.sqrt(this.x * this.x, this.y * this.y)
  }

  set(v) {
    this.x= v.x
    this.y= v.y
  }

  equal(v) {
    return this.x === v.x && this.y === v.y
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  mul(s) {
    return new Vector(this.x * s, this.y * s)
  }
}