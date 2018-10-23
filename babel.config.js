// plugins的顺序是从头到尾
// plugins和presets的用法一样，用法如下
//  "plugins": [
//    "pluginA",
//    ["pluginA"],
//    ["pluginA", {}],
//    ["transform-async-to-module-method", {
//      "module": "bluebird",
//      "method": "coroutine"
//    }]
//  ]
const plugins = []

// presets的顺序是从尾到头
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
]

module.exports = {
  presets,
  plugins
}