var path = require('path')
var webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const PATHS = {
  app: path.resolve(ROOT_PATH, 'src'),
  style: [
    path.join(__dirname, 'src', 'main.css')
  ],
}

const ENV = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080
};

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath:'/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'src/index.tpl.html',
      title: 'Game of pairs',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // display only errors to reduce the amount of output
    stats: 'errors-only',

    // parse host and port from env so this is easy
    // to customize
    host: ENV.host,
    port: ENV.port
  },
};
