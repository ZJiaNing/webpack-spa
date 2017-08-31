/*
* 用于开发环境下的配置文件  使用webpack-merge进行配置参数的合并
* 脚本命令：npm run dev
*/


const webpack = require('webpack');
const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 导入基本的配置
const baseWebpackConfig = require('./webpack.config.js');

var config = merge(baseWebpackConfig, {
  plugins: [
    //下面的这个hash值，如果使用contentHash的话，那么当js修改，而css没有修改的时候，css文件的hash值就不会发生变化了
    new ExtractTextPlugin("[name].[contenthash:5].css"),
    // 配置热加载
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true
  },
  devtool: "source-map"
});


module.exports = config;
/*
* CAUTION
* Hot Module Replacement
* HMR is not intended for use in production, meaning it should only be used in development
*/
