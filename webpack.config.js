const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// https://www.youtube.com/watch?v=IZGNcSuwBZs&t=3s
module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 4000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: RegExp(".scss$"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: RegExp(".(png|svg|jpg|jpeg|gif)$"),
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Chess App",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
