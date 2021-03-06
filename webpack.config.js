const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry:'./app/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index_bundle.js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test: /\.svg$/,
                type: 'asset/resource'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
            { test: /\.(js)$/, use: 'babel-loader'},
            { test: /\.css$/, use: ['style-loader','css-loader']}
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins:[
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new NodePolyfillPlugin()
    ],
    resolve: {
        extensions: ['.js', '.css', '.png', '.jpg', '.gif', '.jpeg','.svg'],
        alias: {
          Images: path.resolve(__dirname, 'app/images')
        }
      },
    devServer:{
        historyApiFallback:true
    }
}