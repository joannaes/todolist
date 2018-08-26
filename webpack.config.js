const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/out.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["env", "stage-2", "react"]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|svg|gif|webp)/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};