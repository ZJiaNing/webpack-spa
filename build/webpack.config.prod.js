/*
* 用于生产环境下的配置文件
* 脚本命令：npm run build
*/

const webpack = require('webpack')

// 导入基本的配置
const config = require('./webpack.config.js')






/*
* CAUTION 1
* 这个插件用于production环境才有其意义
* extract-text-webpack-plugin
* If your total stylesheet volume is big,
* it will be faster because the CSS bundle
* is loaded in parallel to the JS bundle.
*/
