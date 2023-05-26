const glob = require('glob');
const path = require('path');
const paths = require('../paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const generateHTMLPlugins = () =>
  glob.sync('./src/views/pages/**/*.twig').map(
  dir => {
    const arrFolder = dir.split('/')
    const name = path.basename(dir).replace('.twig', '')
    const subfolder = `${ arrFolder[arrFolder.length - 2]}`

    const folderPath = subfolder.toLowerCase() !== name.toLowerCase() && subfolder.toLowerCase() != "pages"
    const pathFile =  path.basename(dir).replace('.twig', '.html')
    const finalPath =  folderPath ? `${subfolder}/${pathFile}`: pathFile != 'index.html' ? `${name}/index.html` : pathFile
    
    return new HtmlWebpackPlugin({
      title: `Sticky blinders`,
      template: dir, // template file
      filename: finalPath, // Output
      cache: false,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks:true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  }
);
module.exports = {generateHTMLPlugins}