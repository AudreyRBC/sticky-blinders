const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

const paths = require('./paths')
const { generateHTMLPlugins } = require('./Core/twig')

module.exports = {
  entry: {
    'app': paths.src + '/scripts/app.ts',
  },
  output: {
    path: paths.build,
    filename: '[name].js',
  },

  plugins: [
    new StylelintPlugin(),
    ...generateHTMLPlugins(),
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    })
  ],

  module: {
    rules: [
      {
        test: /\.twig$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'twig-html-loader',
            options: {
              // debug: true,
              functions: {},
              namespaces: {
                'base': `${paths.src}/views/base/`,
                'common': `${paths.src}/views/common/`,
                'components': `${paths.src}/views/components/`,
                'templates': `${paths.src}/views/templates/`,
                'macros': `${paths.src}/views/macros/`,
                'assets': `${paths.src}/assets/`,
              },
              data: (context) => {
                const arrFolder = context.resourcePath.split('/')
                const name = arrFolder.pop().toLowerCase();
                const subfolder = `${arrFolder[arrFolder.length - 1]}`
                let dataPath = path.join(paths.data, `${subfolder != "pages" ? `${subfolder}/` : ''}${name.replace('twig', 'json')}`);
                if (!fs.existsSync(dataPath)) dataPath = path.join(`${paths.data}/${subfolder}`, `${name.replace('twig', 'json')}`);
                context.addDependency(dataPath); // Force webpack to watch file

                const globalPath = path.join(paths.data, 'global.json');
                context.addDependency(globalPath); // Force webpack to watch file

                const data = context.fs.readJsonSync(dataPath, { throws: false }) || {};
                const global = context.fs.readJsonSync(globalPath, { throws: false }) || {};
                return { ...data, ...global };
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/img/[name][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext][query]'
        }
      },
    ],

  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
      'scripts': paths.src + '/scripts/',
      'styles': paths.src + '/styles/',
      'images': paths.public + '/assets/img/',
      'svg': paths.public + '/assets/svg/',
      'fonts': paths.public + '/assets/fonts/'
    },
  },
}
