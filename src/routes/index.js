// 페이지를 구성하는 구성파일
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home'
import Movie from './Movie'
import Popular from './Popular'
import NotFound from './NotFound'

export default createRouter({
    // history : hash, history 두 가지로 구분
    // hash모드 사용
    // https://google.com/#/search
    history : createWebHashHistory(),
    scrollBehavior(){
        return { top: 0 }
    },
    // routes: page들을 구분
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/popular',
            component: Popular
        },
        {
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
})