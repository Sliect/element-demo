process.on('exit', () => {
  console.log();
})

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}

const fs = require('fs');
const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '../../src/components', componentname);
const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/main.vue';

${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
}

export default ${ComponentName};`
  },
  {
    filename: 'src/main.vue',
    content: `<template>
  <div class="el-${componentname}"></div>
</template>

<script>
export default {
  name: 'El${ComponentName}'
}
</script>`
  },
  {
    filename: path.join('../../assets/theme-chalk/src', `${componentname}.scss`),
    content: `@include b(${componentname}) {

}`
  }
]

// 添加到components.json
const componentsFile = require('../../components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile[componentname] = `./src/components/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, 2), 'utf8')
  .end('\n');

// 添加到index.scss
// const scssFile = require('../../src/assets/theme-chalk/src/index.scss');
// scssFile[componentname] = `@import './${componentname}.scss';`;
fs.appendFileSync(path.resolve(__dirname, '../../src/assets/theme-chalk/src/index.scss'), `@import './${componentname}.scss';\n`)

// 创建 Files下的各个文件
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n')
});

console.log('DONE!');