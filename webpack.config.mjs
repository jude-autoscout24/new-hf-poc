import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin'
import { fileURLToPath } from 'url';
import LocaleHtmlGeneratorPlugin from './LocaleHtmlGeneratorPlugin.mjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url); 


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  target: 'web',
  entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    module: {
      rules: [
        {
            test: /\.ts$/, // Match TypeScript files
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env', // Transpile modern JavaScript
                        '@babel/preset-typescript', // Handle TypeScript
                    ],
                },
            },
        },
        {
          test: /\.node$/,
          use: 'node-loader',
      },
    ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
          events: require.resolve('events/'),
          fs: false,
          path: require.resolve('path-browserify'),
        }
    },
    plugins: [
        new LocaleHtmlGeneratorPlugin(), // Runs your index.ts script to generate HTML files
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/scripts', // Copies additional static files like header.js
                    to: 'scripts',
                },
                { from: 'src/utils/sampleData.json', to: 'utils/sampleData.json' },
                { from: 'src/views', to: './views' },
            ],
        }),
    ],
    externals: {
      fsevents: 'commonjs fsevents', // Exclude fsevents from the bundle
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve content from 'dist'
    },
    compress: true,
    port: 8080,  // Default port for webpack-dev-server
    open: true,  // Automatically opens the browser when the server starts
    hot: true,   // Enable Hot Module Replacement
    historyApiFallback: true,  // Allows React Router or similar SPA routing
  },
};
