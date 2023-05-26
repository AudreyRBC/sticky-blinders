const { merge } = require('webpack-merge')
const path = require('path');
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    compress: true,
    liveReload: false,
    hot: true,
    client: {
      overlay: {
        warnings: false,
        errors: false
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader', 
            options: {
              sourceMap: true,
              additionalData: async (content, loaderContext) => {
                  return `
                  @use "sass:map";
                  @use "sass:string";
                  @use "sass:math";
                  @use "sass:list";
                  
                  @use "~styles/helpers" as *;
                  @use "~styles/rules" as *;
                  // ${content}
                  `
              },
            }
          },
        ],
      },
    ],
  },
})
