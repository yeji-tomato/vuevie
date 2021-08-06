# 🎥 vuevie
TMDb api를 이용한 영화사이트!

## Deployment / 배포
[DEMO <br>
![FireShot Capture 046 - VUEVIE - vuevie netlify app](https://user-images.githubusercontent.com/59958929/128485863-1d1ea959-5be5-4cde-a453-8d130233cc3f.png)](https://vuevie.netlify.app)

### webpack으로 시작!

```
$ cd git
$ npx degit Lee-ye-ji/vue3-webpack-template vuevie
$ cd vuevie
$ npm i
$ code . -r
```

- <style></style> 태그 사용시 message 사라짐 → `style-loader` 버전 다운 그레이드

```
npm i -D style-loader@2.0.0
```

### **`페이지를 구분할 때 사용하는 기술 → Router 기술`**

### vue-router next

next를 쓴 이유는 원래 기존 버전은 2버전인데 우리는 3버전을 사용하므로 대응되기 위해서 

[Installation | Vue Router](https://next.router.vuejs.org/installation.html)

```
npm install vue-router@4
```

**createRouter**

export default → 기본 내보내기 / 이것을 main.js에서 받아서 사용함

`**index.js**`

```jsx
// 페이지를 구성하는 구성파일
import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
    // history : hash, history 두 가지로 구분
    // hash모드 사용
    // https://google.com/#/search
    history : createWebHashHistory(),
    // routes: page들을 구분
    routes: []
})
```

hash모드를 사용해야지만 기본적으로 특정페이지에서 새로고침을 했을 때 페이지를 찾을 수 없다는 메시지를 방지할 수 있음

history모드 → 서버에다가 세팅 작업을 해야기 때문에 hash모드를 사용함

**`<RouterView />` → 컴포넌트 사용 Home, Router, about 페이지를 출력하는 개념임**

각각의 페이지는 router라는 개념을 각각의 영역에서 출력이 된다고 보면 됨

### 부트스트랩(Bootstrap)

```
$ npm i bootstrap@next -- 5버전 설치
```

Bootstrap 오류

353 │ $container-padding-x: $grid-gutter-width / 2 !default;
│                       ^^^^^^^^^^^^^^^^^^^^^^

```
$ npm i sass@1.32.13
```

**downgrading sass to 1.32.***

😀 아이콘

```
$ npm i bootstrap-icons
```

### Vuex

→ 효율적인 방법으로 관리해줄 수 있는 중앙집중화된 상태관리 패턴의 라이브러리 

⇒ 단순하게 데이터를 몰아서 관리해주는 공식 라이브러리

```
$ npm i vuex@next
```

**`mapState`**

```jsx
computed: {
    theMovie() {
      return this.$store.state.movie.theMovie;
    },
    video() {
      return this.$store.state.movie.video;
    },
    loading(){
      return this.$store.state.movie.loading;
    }
  },
```

⇒ 반복적으로 코드가 작성되고 있기 때문에 쉽게 관리하기 위해서 vuex의 Helper를 사용함!

```jsx
import { mapState } from 'vuex'

computed: {
    ...mapState('movie',[
      'theMovie',
      'video',
      'loading'
    ])
 },
```

→ movie라는 모듈의 이름을 명시, 두번째 인수로는 배열을 추가해서 각각의 아이템부분에다가 문자 데이터로 가지고 올 state 즉, 상태들의 이름을 명시해주면 된다!

matState가 실행된  결과를 통해서 명시한 내용들이 객체 데이터로 반환 ⇒ 객체 데이터를 전개 연산자로 전개해서 computed라는 계산된 데이터에 등록을 하는 것이다.

**`mapActions`**

→ **store의 Action을 가지고 오는 방법**

```jsx
created() {
    this.$store.dispatch("movie/searchMovieWithId", {
      id: this.$route.params.id,
    });
  },
```

```jsx
import { mapState, mapActions } from 'vuex'

created() {
    // this.$store.dispatch("movie/searchMovieWithId", {
      this.searchMovieWithId({
      id: this.$route.params.id,
    });
  },
  methods: {
    ...mapActions('movie',[
      'searchMovieWithId'
    ])
}
```

⇒ 활용도가 제일 높은 것은! **`mapState`** 이다!

### Vuex의 핵심정리

App.vue파일을 기준으로 여러가지 컴포넌트를 활용하게 된다.

부모형제가 아닌 특정한 관계가 떨어지지 않는 여러가지 컴포넌트들에서 같은 데이터를 활용할 때는 **Store 라는 개념!**

→ 즉, vuex라는 패키지를 가지고 와서 플러그인으로 연결해서 활용할 수 있음!

store내부에서 관리하고, 그것을 각각의 컴포넌트로 가지고 와서 활용할 수 있는 것으로 만듬!

Store의 movie라는 모듈이라는 개념으로 연결해줌! 모듈들은 기본적인 기능으로 관리하는 용도!

**`Store`**

namespaced라는 옵션을 제외하고, 나머지 state, getters, mutations, actions 각각의 옵션들로 나누어지게 된다!

* **state**(data) → vue.js 컴포넌트에서 알고 있는 하나의 데이터

* **getters**(computed) → 계산된 데이터 computed와 유사함. 데이터라고 볼 수 있는 계산된 형태로 활용할 수 있도록 getters를 사용할 수 있음

* **mutations**(methods) → vue컴포넌트의 method와 유사함 state를 변경할 수 있는 권한을 가지고 있어서 state를 변경하는 로직만 일관적으로 작성하게 됨

* **actions**(methods, 비동기) → vue컴포넌트의 method와 유사함  나머지 부분들은  actions에다가 작성을 해 비동기도 가능 할 수 있도록 작성하는 것이 일반적임!

```
context.state
context.getters
context.commit -> mutations
context.dispatch -> actions(다른 액션을 실행하는 용도)
```

### Axios

```
$ npm i axios
```

자바스크립트 내부에서 비동기로 동작이 되어야하기 때문에 → async

그 처리된 결과가 나올 때까지 기다리기 위해서 → await

### Carousel

```
$ npm i swiper
```

### 암호키 숨기기

```
$ npm i -D dotenv-webpack
```

**webpack.config.js**

```jsx
const Dotenv = require('dotenv-webpack')

plugins: [
        ...
        new Dotenv
    ],
```

**.env 파일 생성**

TMDB_API_KEY=암호키

axios.js

```jsx
const TMDB_API_KEY = process.env.TMDB_API_KEY
// 구조 분해
const { TMDB_API_KEY } = process.env
```

netlify에 올리기 → **netlify.toml** 만든 후 작성해야 함!

package.json

```json
"dev:netlify" : "netlify dev",
```

```
$ npm i -D netlify-cli
```

### 반복되는 import 규칙

**`*additionalData*`**

```jsx
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
         {
              loader: 'sass-loader',
              options: {
                  additionalData: '@import "~/scss/main";'
              }
            },
          },
        ],
      },
    ],
  },
};
```

문자 데이터를 → 객체 데이터로 변경
