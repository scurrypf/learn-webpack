const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin} = require('webpack');
// 添加css单文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // 文件入口点
    entry:'./src/main.js',
    // 文件输出
    output:{
        path:path.join(__dirname,'../dist'),
        filename:'js/[name].[contenthash:8].js'
    },
    // // 模式
    // mode: 'production',
    // loader
    module: {
        rules: [
            {   // 处理vue单文件
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {   // 处理css文件
                test: /\.css$/i,
                // loader的处理顺序是从后往前
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {   // 处理scss or sass文件
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader","sass-loader"],
            },
            {   // 处理图片、动图
                test: /\.(jpg|png|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:8][ext]'
                }
            },
            {   // 处理svg
                test: /\.(svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8][ext]'
                }
            },
            {   // 处理音视频文件
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'media/[name].[hash:8][ext]'
                }
            },
            {   // 处理字体文件
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    filename: 'fonts/[name].[hash:8][ext]'
                }
            },
            
        ]
    },
    // plugin插件
    plugins: [
        new VueLoaderPlugin(),
        // 使每次编译都可以直接编译一个HTML
        new HtmlWebpackPlugin({
            template:'index.html'
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(false),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
        }),
        // 使css文件都处于css文件夹下
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
    ],
    // devtool:'souce-map',
    // 外部依赖, 1.将vue引入替换成从window对象上获取，2.在index.html中写上cnd链接
    // 包括lodash工具库，axios，elementui，这些外部依赖
    externalsType: 'window',
    externals: {
        vue: 'Vue'
    },
    optimization: {
        // 自动分包
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },

    },
}