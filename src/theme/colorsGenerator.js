const __parseString = (root, value) => {
  return `--${root}:${value};`
}

const __parseObject = (root, value) => {
  return Array.from(Object.entries(value), ([name, colorCode]) => {
    return `--${root}-${name}:${colorCode};`
  })
}

const __genCssString = theme => {
  const parsed = Array.from(Object.entries(theme), ([root, value]) => {
    if (typeof value === 'string') return __parseString(root, value)
    else return __parseObject(root, value)
  })
  return parsed.flat().join('')
}

const colorsGenerator = theme => {
  const colorString = __genCssString(theme)
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `:root { ${colorString} } `

  document.getElementsByTagName('head')[0].appendChild(style)
}

export default colorsGenerator
