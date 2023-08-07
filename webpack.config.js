const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  node: {
    __dirname: false,
    __filename: false,
    global: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
        // "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "stream": require.resolve("stream-browserify"),
        // "assert": require.resolve("assert/"),
        "http": require.resolve("stream-http"),
        "browser": require.resolve('browser'),
        // "net": false,
        "tls": false,
        "fs": false,
      },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"),
    filename: 'index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
};