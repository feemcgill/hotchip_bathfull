import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const pathsToClean = [
  'dist'
]

const cleanOptions = {
  exclude: ['_redirects'],
  verbose: true,
  dry: false
}

const build = (env, options) => {


  return {
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],          
        }                
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      filename: '[name].[hash].js'
    },
    devServer: {
      publicPath: '/',
      historyApiFallback: true
    },
    plugins: [
      new CleanWebpackPlugin(
        pathsToClean,
        cleanOptions
      ),
      new HtmlWebpackPlugin({
        title: "Bathtfull of Ecstasy",
        description: "",
        site_url: "",
        template: './templates/index.html'
      }),
      new CopyWebpackPlugin([
        { from: './assets/**/*', to: './' }
      ]), 
    ]
  };
};

export default build;