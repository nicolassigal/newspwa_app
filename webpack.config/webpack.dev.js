const merge = require('webpack-merge');
const baseConfig = require('../webpack.config');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

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
        ])
      ] 
}

module.exports = merge(baseConfig, config);