/*
* 用于生产环境下的配置文件  使用webpack-merge进行配置参数的合并
* 脚本命令：npm run build
* 需要达成的目标是将css文件抽离出js
* 打包分析工具webpack-bundle-analyzer
* 代码压缩: js: UglifyJsPlugin   css: optimize-css-assets-webpack-plugin
* css的我找不到别的方法了，都失败了，先暂时放一下吧
*/

const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// 导入基本的配置
const baseWebpackConfig = require('./webpack.config.js')

const config = merge(baseWebpackConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].[contenthash:5].css"),
    new BundleAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({              // 提取公共js代码
        names: ['vendors'],
    }),
    new OptimizeCssAssetsPlugin({

    })
  ]
});

module.exports = config;




/*
* CAUTION 1
* 这个插件用于production环境才有其意义
* extract-text-webpack-plugin
* If your total stylesheet volume is big,
* it will be faster because the CSS bundle
* is loaded in parallel to the JS bundle.
*/
