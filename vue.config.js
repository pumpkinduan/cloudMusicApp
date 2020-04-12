const path = require("path");
module.exports = {
  // outputDir: 'public',
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/assets/css/variable.scss"),
        path.resolve(__dirname, "./src/assets/css/mixin.scss")
      ]
    }
  }
};
