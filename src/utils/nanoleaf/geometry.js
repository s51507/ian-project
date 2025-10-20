// 幾何計算相關函數

// 計算兩點距離
export const distance = (p1, p2) => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

// 獲取三角形的點（SVG polygon points）
export const getTrianglePoints = (size) => {
  const height = (size * Math.sqrt(3)) / 2
  return `0,${-height/2} ${-size/2},${height/2} ${size/2},${height/2}`
}

// 獲取六角形的點（SVG polygon points）
export const getHexagonPoints = (size) => {
  const points = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const x = Math.cos(angle) * size
    const y = Math.sin(angle) * size
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

// 獲取形狀的頂點（世界座標）
export const getShapeVertices = (panel) => {
  const vertices = []
  const rad = panel.rotation * Math.PI / 180
  
  if (panel.type === 'triangle' || panel.type === 'miniTriangle') {
    // 等邊三角形頂點
    const height = (panel.size * Math.sqrt(3)) / 2
    const localVertices = [
      { x: 0, y: -height/2 },
      { x: -panel.size/2, y: height/2 },
      { x: panel.size/2, y: height/2 }
    ]
    
    localVertices.forEach(v => {
      vertices.push({
        x: panel.x + v.x * Math.cos(rad) - v.y * Math.sin(rad),
        y: panel.y + v.x * Math.sin(rad) + v.y * Math.cos(rad)
      })
    })
  } else if (panel.type === 'hexagon') {
    // 六角形頂點
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      const vx = Math.cos(angle) * panel.size
      const vy = Math.sin(angle) * panel.size
      vertices.push({
        x: panel.x + vx * Math.cos(rad) - vy * Math.sin(rad),
        y: panel.y + vx * Math.sin(rad) + vy * Math.cos(rad)
      })
    }
  } else if (panel.type === 'square') {
    // 正方形頂點
    const half = panel.size / 2
    const localVertices = [
      { x: -half, y: -half },
      { x: half, y: -half },
      { x: half, y: half },
      { x: -half, y: half }
    ]
    
    localVertices.forEach(v => {
      vertices.push({
        x: panel.x + v.x * Math.cos(rad) - v.y * Math.sin(rad),
        y: panel.y + v.x * Math.sin(rad) + v.y * Math.cos(rad)
      })
    })
  }
  
  return vertices
}

// 獲取形狀的邊（頂點對）
export const getShapeEdges = (panel) => {
  const vertices = getShapeVertices(panel)
  const edges = []
  
  for (let i = 0; i < vertices.length; i++) {
    const v1 = vertices[i]
    const v2 = vertices[(i + 1) % vertices.length]
    edges.push({ v1, v2, midpoint: { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 } })
  }
  
  return edges
}

// 檢查兩條邊是否平行
export const areEdgesParallel = (edge1, edge2, tolerance = 0.2) => {
  const angle1 = Math.atan2(edge1.v2.y - edge1.v1.y, edge1.v2.x - edge1.v1.x)
  const angle2 = Math.atan2(edge2.v2.y - edge2.v1.y, edge2.v2.x - edge2.v1.x)
  const angleDiff = Math.abs(angle1 - angle2) % Math.PI
  return angleDiff < tolerance || angleDiff > Math.PI - tolerance
}

