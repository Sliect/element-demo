# element源码demo

## 第一步 搭建element 组件环境 和 karma 测试环境


### tips
```
babel src --out-dir lib --ignore src/index.js 将src下的除了src/index.js文件外的所有js文件编译到lib文件夹下

rimraf 以包的形式包装rm -rf命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。
const rimraf = require('rimraf');
rimraf('./test.txt', function (err) { // 删除当前目录下的 test.txt
  console.log(err);
});

uppercamelcase 转驼峰格式

在vue-loader中的options设置如下, 可以达到将.vue文件中的inline-block之间的空格去掉的效果
compilerOptions: {
  preserveWhitespace: false
}

```

### 注意事项
```
components.json 必须与组件一一对应
npm run build:new [param: 组件名] 新建一个组件, 自动化相应的格式
```