const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const webpack = require('webpack');

module.exports = env => {
  const API_URL = env.local ? 'http://localhost:5000': 'https://chalhoubappserver.herokuapp.com';
  return {
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    entry: "./src/index.js",
    output: {
      filename: "main.[contentHash].bundle.js",
      path: path.resolve(__dirname, "../public"),
      publicPath: '/'
    },
    devServer: {
      historyApiFallback: true,
      contentBase: "../public/"
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
          test: /\.(png|jpg|svg)$/,
          use: [
            {loader: 'file-loader'}
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
      "API_URL": JSON.stringify(API_URL)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({ template: "src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "main.[contentHash].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/assets"),
        to: path.resolve(__dirname, "../public/assets")
      }
    ]),
    new WebpackMd5Hash(),
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: new RegExp( /.*\.(?:png|jpg|jpeg|svg|gif)/),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60, // 1 Day, news always changing
            }
          }
        },
        {
          urlPattern: new RegExp(/^https:\/\/fonts\.googleapis\.com/),
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-stylesheet-cache'
          }
        },
        {
          urlPattern: new RegExp(/^https:\/\/fonts\.gstatic\.com/),
          handler: 'CacheFirst',
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
        },
        {
          urlPattern: new RegExp('https://chalhoubappserver.herokuapp.com/categories'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'news-api-category-cache-prod'
          }
        },
        {
          urlPattern: new RegExp('https://chalhoubappserver.herokuapp.com/top-headlines'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'news-api-headlines-cache-prod',
          }
        }
      ]
    }),
    new WebpackPwaManifest({
      name: 'News App',
      short_name: 'News App',
      description: 'World Wide News App',
      background_color: '#fff',
      orientation: "portrait",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: path.resolve('src/assets/icons/icon.png'),
          sizes: [72,96, 128, 144, 152, 192, 384, 512],
          destination: "assets/icons",
        }
      ]
    })
  ]
  }
};