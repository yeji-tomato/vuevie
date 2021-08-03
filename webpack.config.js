// import
// node.js 환경에서 사용할 수 있는 path라는 전역모듈을 가지고 와서 path라는 변수에다가 할당함
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader'); // 3번째

// export
module.exports = {
    resolve:{
        extensions: ['.js', '.vue'],
        // 경로별칭
        alias:{
            '~': path.resolve(__dirname, 'src'), 
            'assets': path.resolve(__dirname, 'src/assets')
        }
    },

    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './src/main.js',

    // 결과물(번들)을 반환하는 설정
    output: {
        // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역 변수
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',
        clean: true
    },

    // 모듈 처리 방식을 설정
    module: {
        rules: [
        {
            // 1번째
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.s?css$/,
            use: [
            // 순서 중요!
            'vue-style-loader', // 2번째
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/, // 제외할 경로
            use: [
            'babel-loader'
            ]
        },
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            use: 'file-loader'
        }
        ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
        new HtmlPlugin({
        template: './index.html',
        }),
        new CopyPlugin({
        patterns: [
            { from: 'static' } // 여기서 static은 우리가 만들어 놓은 파일 이름!
        ]
        }),
        new VueLoaderPlugin()
    ],

    // 개발 서버 옵션
    devServer: {
        host: 'localhost',
        port: 8081,
        hot: true 
    }
}