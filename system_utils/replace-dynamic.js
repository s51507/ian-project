import fs from 'fs'

const reg = /\/src\/main\.js/g
const mainSrcReg = /VITE_MAIN_JS_SRC=(?=(.+\.js))/

const main = async() => {
  const envData = await fs.readFileSync('env/.env.production', 'utf-8')
  const marinSrc = envData.match(mainSrcReg)[1]

  const raw = await fs.readFileSync('dist/index.html', 'utf-8')
  const replaceData = raw.replace(reg, marinSrc)
  await fs.writeFileSync('dist/index.html', replaceData)
}

main()
