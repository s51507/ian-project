// 吸附邏輯相關函數
import { distance, getShapeEdges, getShapeVertices, areEdgesParallel } from './geometry'

// 嘗試更新最佳吸附點（輔助函數）
const tryUpdateSnap = (dist, point1, point2, currentMinError, currentBestSnap) => {
  if (dist < currentMinError) {
    return {
      minError: dist,
      bestSnap: {
        dx: point2.x - point1.x,
        dy: point2.y - point1.y,
        snapPoint: point2
      }
    }
  }
  return { minError: currentMinError, bestSnap: currentBestSnap }
}

// 檢查點對點吸附
export const checkPointToPointSnap = (panelVertices, otherVertices, panelEdges, otherEdges, isMiniTriangle, otherIsMiniTriangle, snapDistance) => {
  let minError = snapDistance
  let bestSnap = null

  // 1. 頂點對頂點
  panelVertices.forEach(v1 => {
    otherVertices.forEach(v2 => {
      const dist = distance(v1, v2)
      if (dist < snapDistance) {
        const result = tryUpdateSnap(dist, v1, v2, minError, bestSnap)
        minError = result.minError
        bestSnap = result.bestSnap
      }
    })
  })

  // 2. 邊中點對頂點
  if (!isMiniTriangle) {
    panelEdges.forEach(edge => {
      otherVertices.forEach(vertex => {
        const dist = distance(edge.midpoint, vertex)
        if (dist < snapDistance) {
          const result = tryUpdateSnap(dist, edge.midpoint, vertex, minError, bestSnap)
          minError = result.minError
          bestSnap = result.bestSnap
        }
      })
    })
  }

  // 3. 頂點對邊中點
  if (!otherIsMiniTriangle) {
    panelVertices.forEach(vertex => {
      otherEdges.forEach(edge => {
        const dist = distance(vertex, edge.midpoint)
        if (dist < snapDistance) {
          const result = tryUpdateSnap(dist, vertex, edge.midpoint, minError, bestSnap)
          minError = result.minError
          bestSnap = result.bestSnap
        }
      })
    })
  }

  return { minError, bestSnap }
}

// 檢查邊對邊吸附
export const checkEdgeToEdgeSnap = (edge1, edge2, edge1Length, edge2Length, isMiniTriangle, otherIsMiniTriangle, minError, bestSnap) => {
  // 必須平行才能吸附
  if (!areEdgesParallel(edge1, edge2)) return { minError, bestSnap }

  // 情況 1: 整條邊對整條邊
  if (Math.abs(edge1Length - edge2Length) < 10) {
    const error1 = distance(edge1.v1, edge2.v1) + distance(edge1.v2, edge2.v2)
    const error2 = distance(edge1.v1, edge2.v2) + distance(edge1.v2, edge2.v1)
    const error = Math.min(error1, error2)
    
    if (error < minError * 2) {
      minError = error
      const snapPoint = error1 < error2 ? 
        { x: (edge2.v1.x + edge2.v2.x) / 2, y: (edge2.v1.y + edge2.v2.y) / 2 } :
        { x: (edge2.v2.x + edge2.v1.x) / 2, y: (edge2.v2.y + edge2.v1.y) / 2 }
      
      bestSnap = {
        dx: error1 < error2 ? 
          (edge2.v1.x + edge2.v2.x - edge1.v1.x - edge1.v2.x) / 2 :
          (edge2.v2.x + edge2.v1.x - edge1.v1.x - edge1.v2.x) / 2,
        dy: error1 < error2 ?
          (edge2.v1.y + edge2.v2.y - edge1.v1.y - edge1.v2.y) / 2 :
          (edge2.v2.y + edge2.v1.y - edge1.v1.y - edge1.v2.y) / 2,
        snapPoint
      }
    }
  }

  // 情況 2: 半邊對半邊（大形狀）
  if (!isMiniTriangle && !otherIsMiniTriangle && edge1Length > 60 && edge2Length > 60) {
    const combinations = [
      { p1: edge1.midpoint, p2: edge1.v1, q1: edge2.midpoint, q2: edge2.v1 },
      { p1: edge1.midpoint, p2: edge1.v1, q1: edge2.midpoint, q2: edge2.v2 },
      { p1: edge1.midpoint, p2: edge1.v2, q1: edge2.midpoint, q2: edge2.v1 },
      { p1: edge1.midpoint, p2: edge1.v2, q1: edge2.midpoint, q2: edge2.v2 },
    ]

    combinations.forEach(combo => {
      const error1 = distance(combo.p1, combo.q1) + distance(combo.p2, combo.q2)
      const error2 = distance(combo.p1, combo.q2) + distance(combo.p2, combo.q1)
      const error = Math.min(error1, error2)
      
      if (error < minError * 2) {
        minError = error
        const snapPoint = { x: (combo.q1.x + combo.q2.x) / 2, y: (combo.q1.y + combo.q2.y) / 2 }
        bestSnap = {
          dx: error1 < error2 ?
            (combo.q1.x + combo.q2.x - combo.p1.x - combo.p2.x) / 2 :
            (combo.q2.x + combo.q1.x - combo.p1.x - combo.p2.x) / 2,
          dy: error1 < error2 ?
            (combo.q1.y + combo.q2.y - combo.p1.y - combo.p2.y) / 2 :
            (combo.q2.y + combo.q1.y - combo.p1.y - combo.p2.y) / 2,
          snapPoint
        }
      }
    })
  }

  // 情況 3 & 4: 小三角形與大形狀的半邊
  if ((isMiniTriangle && !otherIsMiniTriangle && edge2Length > 60) ||
      (!isMiniTriangle && otherIsMiniTriangle && edge1Length > 60)) {
    const combinations = isMiniTriangle ? [
      { p1: edge1.v1, p2: edge1.v2, q1: edge2.midpoint, q2: edge2.v1 },
      { p1: edge1.v1, p2: edge1.v2, q1: edge2.midpoint, q2: edge2.v2 },
    ] : [
      { p1: edge1.midpoint, p2: edge1.v1, q1: edge2.v1, q2: edge2.v2 },
      { p1: edge1.midpoint, p2: edge1.v2, q1: edge2.v1, q2: edge2.v2 },
    ]

    combinations.forEach(combo => {
      const error1 = distance(combo.p1, combo.q1) + distance(combo.p2, combo.q2)
      const error2 = distance(combo.p1, combo.q2) + distance(combo.p2, combo.q1)
      const error = Math.min(error1, error2)
      
      if (error < minError * 2) {
        minError = error
        const snapPoint = { x: (combo.q1.x + combo.q2.x) / 2, y: (combo.q1.y + combo.q2.y) / 2 }
        bestSnap = {
          dx: error1 < error2 ?
            (combo.q1.x + combo.q2.x - combo.p1.x - combo.p2.x) / 2 :
            (combo.q2.x + combo.q1.x - combo.p1.x - combo.p2.x) / 2,
          dy: error1 < error2 ?
            (combo.q1.y + combo.q2.y - combo.p1.y - combo.p2.y) / 2 :
            (combo.q2.y + combo.q1.y - combo.p1.y - combo.p2.y) / 2,
          snapPoint
        }
      }
    })
  }

  return { minError, bestSnap }
}

// 主要的吸附檢查函數
export const checkSnapping = (panel, panels, snapPreview) => {
  const snapDistance = 15
  let minError = snapDistance
  let bestSnap = null

  panels.value.forEach(otherPanel => {
    if (otherPanel.id === panel.id) return

    const panelEdges = getShapeEdges(panel)
    const otherEdges = getShapeEdges(otherPanel)
    const panelVertices = getShapeVertices(panel)
    const otherVertices = getShapeVertices(otherPanel)
    const isMiniTriangle = panel.type === 'miniTriangle'
    const otherIsMiniTriangle = otherPanel.type === 'miniTriangle'

    // 檢查點對點吸附
    const pointResult = checkPointToPointSnap(
      panelVertices, otherVertices, panelEdges, otherEdges,
      isMiniTriangle, otherIsMiniTriangle, snapDistance
    )
    if (pointResult.bestSnap && pointResult.minError < minError) {
      minError = pointResult.minError
      bestSnap = pointResult.bestSnap
    }

    // 檢查邊對邊吸附
    panelEdges.forEach(edge1 => {
      const edge1Length = distance(edge1.v1, edge1.v2)
      otherEdges.forEach(edge2 => {
        const edge2Length = distance(edge2.v1, edge2.v2)
        const edgeResult = checkEdgeToEdgeSnap(
          edge1, edge2, edge1Length, edge2Length,
          isMiniTriangle, otherIsMiniTriangle, minError, bestSnap
        )
        if (edgeResult.bestSnap) {
          minError = edgeResult.minError
          bestSnap = edgeResult.bestSnap
        }
      })
    })
  })

  // 更新吸附預覽
  snapPreview.value = bestSnap?.snapPoint || null

  // 應用吸附
  if (bestSnap) {
    panel.x += bestSnap.dx
    panel.y += bestSnap.dy
  }
}

