const webpack = require('webpack');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  target: 'web',
  entry: {
    index: './lib/index.js',
  },
  output: {
    library: 'react-image-grid',
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: './',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env', {
              modules: false, // Tree Shaking
              useBuiltIns: 'usage'
            }
          ],
          '@babel/preset-react',
        ],
        plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-react-jsx"]
      },
      exclude: ['/node_modules'],
    }]
  },
  plugins: [],
  resolve: {
    modules: ['./node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};