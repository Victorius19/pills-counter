const webpack = require('webpack');
const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  // In dev mode we use ForkTsCheckerWebpackPlugin for type checking, which is faster when re-compiling
  const tsConfigOptions = isProduction ? {} : {
    transpileOnly: true,
    experimentalWatchApi: true,
  }

  return {
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        // Loader for TypeScript files in ./src
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, './src'),
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: { babelrc: true },
            },
            {
              loader: 'ts-loader',
              options: {
                ...tsConfigOptions,
                configFile: path.resolve(__dirname, './src/tsconfig.json'),
              }
            },
          ]
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', 'ttf' ],
    },
    output: {
      path: path.resolve(__dirname, './docs'),
      publicPath: './',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
      }),

      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, './public') },
        ],
      }),
    ],
    devServer: {
      port: 5000,
      open: true,
      inline: true,
      compress: false,
      hot: true,
    },
  };
};
