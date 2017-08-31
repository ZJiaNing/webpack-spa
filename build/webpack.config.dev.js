/*
* 用于开发环境下的配置文件
* 脚本命令：npm run dev
*/


const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 导入基本的配置
const config = require('./webpack.config.js');

// 配置热加载
config.plugins.push(new ExtractTextPlugin("[name].[hash:5].css"));   // 这个配置文件其实不应该放在这边的。。。
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devtool = "source-map";  // 这个是怎么个形式呢 ？？
config.devServer = {
  inline: true,
  hot: true
}

module.exports = config;
/*
* CAUTION
* Hot Module Replacement
* HMR is not intended for use in production, meaning it should only be used in development
*/
