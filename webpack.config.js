const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const tsConfigFile = 'tsconfig.build.json';

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'main.ts'), // 入口文件。改成你自己的
  output: {
    path: path.resolve(__dirname, 'dist'), // 出口文件，如果没什么特殊的就可以不管
    filename: 'index.js',
  },
  // 忽略依赖
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      // 别名路径处理
      new TsconfigPathsPlugin({
        configFile: tsConfigFile,
      }),
    ],
  },
};
