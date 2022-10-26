const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    
    devServer: {
        hot: true,
    },

    entry: {
        bundle: path.resolve(__dirname, './src/index.js')
    },

    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: "images/[hash][ext][query]"
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        
        new MiniCssExtractPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.s?css$/i,
                
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: ""},
                    },
                    "css-loader", 
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                
            },
        ]
    }
}