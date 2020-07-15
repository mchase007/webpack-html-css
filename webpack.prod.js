const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {

  /*
  development mode prevents minification of generated code.
  devtool none prevents the use of eval and other conventions.
  contentHash prevents caching of files which can interfere with loading of changes.

  HtmlWepbackPlugin generates html file from template and inserts js and css files.
  Html-loader and File-loader handle image generation and intergration.
  */ 

  mode: "production",
  entry: './src/index.js',
  target: "node",
  output: {
    filename: 'main.[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },   //end of output
  
  optimization: {
    
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ]
  }, // end of optimization

  plugins : [

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments:true,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
     }),

    new CleanWebpackPlugin()

  ], //end of plugins

  module: {
    
    rules: [

      {
        test: /\.html$/,
        loader: ['html-loader'],
      },

      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: "images"
              }
          }
        ]   //end of file-loader use
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            options: {
              sourceMap: true,
            }
          },
        
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [AutoPrefixer()],
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ],
      }
    ]   //end of rules
  }   //end of module
}   //end of module.exports