/*
* 用于生产环境下的配置文件
* 脚本命令：npm run build
* 需要达成的目标是将css文件抽离出js，但是应该怎么做呢？
*/

const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 导入基本的配置
const config = require('./webpack.config.js')

config.plugins.push(new ExtractTextPlugin("[name].[hash:5].css"));

module.exports = config;




/*
* CAUTION 1
* 这个插件用于production环境才有其意义
* extract-text-webpack-plugin
* If your total stylesheet volume is big,
* it will be faster because the CSS bundle
* is loaded in parallel to the JS bundle.
*/
