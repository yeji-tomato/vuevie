# Webpack을 이용한 Vue 프로젝트 생성
**npx를 이용한 vue-webpack-template 폴더 생성**

```
$ cd git(파일이름)
$ npx degit Lee-ye-ji/webpack-first vue-webpack-template
$ cd vue-webpack-template
$ code . -r
```

기존의 js폴더 전체 삭제! 

→ src폴더 생성 후 **`main.js`** , **`App.vue`** 생성

```
$ npm i vue@next // 최신의 3버전
// $ npm i vue // 2버전
```

개발할 때만 사용하는 패키지가 아닌 

브라우저 상에서도 동작하는 패키지이기 때문에 -D를 붙여주지 않아야 함!

→ 일반의존성!!!

```
$ npm i -D vue-loader@next vue-style-loader @vue/compiler-sfc
```

**vue-loader** 

**vue-style-loader**

**vue/compiler-sfc : vue를 컴파일해주는 패키지**

**`🌐webpack.config.js`**

1) 모듈 test: /\.vue$/,  use: 'vue-loader'

2)  모듈 'vue-style-loader', → css 부분

3) 플러그인 VueLoaderPlugin

```jsx
// import
// node.js 환경에서 사용할 수 있는 path라는 전역모듈을 가지고 와서 path라는 변수에다가 할당함
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader'); // 3번째

// export
module.exports = {
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
        // port: 8080,
        // hot: true
    }
}
```

**`🍏App.vue`**

```jsx
<template>
    <h1>{{ message }}</h1>
</template>

<script>
export default {
    data(){
        return{
            message: 'Hello Vue!!!'
        }
    }
}
</script>
```

**`🧀main.js`**

```jsx
import Vue from 'vue';
import App from './App.vue';

Vue.createApp(App).mount("#app"); // App -> App.vue역할 // CDN파트에서 본 문법
```

**`🍎index.html`**

```html
<div id="app"></div>
```

**`🧀main.js`**

```jsx
import { createApp } from 'vue';  // 객체분해 -> { createApp }
import App from './App.vue';

createApp(App).mount("#app"); // CLI에서 본 문법
```

```
$ npm run dev
```
