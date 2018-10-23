const postcss   = require('postcss')
const fs        = require('fs')
const path      = require('path')
const chalk     = require('chalk')
const fontFile  = fs.readFileSync(path.resolve(__dirname, '../../src/assets/theme-chalk/src/icon.scss'), 'utf-8')
const nodes     = postcss.parse(fontFile).nodes
const classList = []

nodes.forEach(node => {
  let selector = node.selector || ''
  let reg = new RegExp(/\.el-icon-([^:]+):before/)
  let arr = selector.match(reg)

  if (arr && arr[1]) {
    classList.push(arr[1])
  }
});

fs.writeFile(path.resolve(__dirname, '../../src/icon.json'), JSON.stringify(classList), () => {})
console.log(chalk.green('[build icons] DONE.'))