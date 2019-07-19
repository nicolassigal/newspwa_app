const merge = require('webpack-merge');
const baseConfig = require('../webpack.config');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');

const config = {
    entry: "./src/index.js",
    output: {
      filename: "main.bundle.js",
      path: path.resolve(__dirname, "../public"),
      publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, "public"),
        watchContentBase: true,
        publicPath: "/",
        historyApiFallback: true
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ]
          }
        ]
      },
    plugins: [
      new webpack.DefinePlugin({
        "API_URL": JSON.stringify("http://localhost:5000")
      }),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({ template: "src/index.html" }),
        new MiniCssExtractPlugin({
          filename: "main.css"
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, "../src/assets"),
            to: path.resolve(__dirname, "../public/assets")
          },
          {
            from: path.resolve(__dirname, "../src/service-worker.js"),
            to: path.resolve(__dirname, "../public/service-worker.js")
          }
        ]),
        new WorkboxPlugin.GenerateSW({
          swDest: 'service-worker.js',
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern: new RegExp(/\.(?:png|gif|jpg|svg)$/),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'images-cache'
              }
            },
            {
              urlPattern: new RegExp(/^https:\/\/fonts\.googleapis\.com/),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheet-cache'
              }
            },
            {
              urlPattern: new RegExp(/^https:\/\/fonts\.gstatic\.com/),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-web-fonts-cache'
              }
            },
            {
              urlPattern: new RegExp('http://localhost:5000/categories'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'news-api-category-cache'
              }
            },
            {
              urlPattern: new RegExp('http://localhost:5000/top-headlines'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'news-api-headlines-cache',
              }
            }
          ]
        }),
      ] 
}

module.exports = merge(baseConfig, config);