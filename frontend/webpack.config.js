const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [{
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                  sortAttrs: true,
                  removeXMLNS: true,
                },
              },
            },
          }],
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.module\.s([ac])ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.s([ac])ss$/,
          exclude: /\.module.(s([ac])ss)$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'public', 'images'),
            to: path.resolve(__dirname, 'build', 'images'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'public', 'index.html'),
      }),
      new ESLintPlugin(),
      new StylelintPlugin({
        fix: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      static: [
        path.resolve(__dirname, './build'),
      ],
      client: {
        port: 9000,
      },
    },
  };
};
