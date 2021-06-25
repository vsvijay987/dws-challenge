require("./lib/polyfill");
require("./lib/fx-broker");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const fxClient = require("./lib/fx-client");
const config = require("./lib/config");

const brokerUrl = `ws://${config.broker.host}:${config.broker.port}`;

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    proxy: {
      "/stomp": {
        target: brokerUrl,
        ws: true
      }
    },
    after: function() {
      fxClient.start(brokerUrl);
    }
  }
};
