const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


var config = {
    mode: 'production',
    context: path.resolve(__dirname),
    entry: {
        awesomplete: './src/js/awesomplete.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
        libraryTarget: 'umd',
        library: 'Awesomplete'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                  output: {
                    comments: false,
                  },
                },
            }),
        ],
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};

module.exports = (env, argv) => {
    if (argv.mode == 'production') {
        config.output.filename = '[name].min.js';
        config.optimization.minimize = true;
        config.devtool = 'eval-cheap-module-source-map';
    }
    return config;
};
