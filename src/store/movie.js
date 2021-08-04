// import axios from 'axios'
import { url } from "../../utils/axios";

export default{ 
    namespaced: true,
    state: () => ({
        movies : [],
        message: '',
        pages: 0,
        loading: false,
        theMovie: []
    }),
    getters: {},
    mutations: {
        updateState(state, payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = ''
            state.loading = false
            state.pages = 0
        }
    },
    actions: {
        async searchMovies({ state, commit }, payload){
            const { title, page } = payload

            if(state.loading) return

            commit('updateState',{
                loading: true
            })

            try{
                // const res = await _fetchMovie({
                //     ...payload
                // })
                const search = await url.search(title, page)
                const { results, total_pages } = search.data
                commit('updateState', {
                    movies: results,
                    pages : total_pages,
                    title: payload.title
                })
            }catch({message}){
                commit('updateState', {
                    movies: [],
                    message
                })
            }finally{
                commit('updateState',{
                    loading: false
                })
            }
        },
        async searchMovieWithId({ state ,commit }, payload){
            const { id } = payload

            if(state.loading) return

            commit('updateState',{
                loading: true,
                theMovie: []
            })

            try{
               const theMovie = await  url.movieDetail(id)
               commit('updateState', {
                   theMovie: theMovie .data
               })
            }catch(error){
                commit('updateState',{
                    theMovie: []
                })
            }finally{
                commit('updateState',{
                    loading: false
                })
            }
        },
        async popularMovie({ state ,commit }, payload){
            if(state.loading) return

            commit('updateState',{
                loading: true,
                popular: []
            })

            try{
                const popular = await  url.popular(payload)
               commit('updateState', {
                    popular: popular.data
               })
            }catch(error){
                commit('updateState',{
                    popular: []
                })
            }finally{
                commit('updateState',{
                    loading: false
                })
            }
        },
        async nowPlayingMovie({ state ,commit }, payload){
            if(state.loading) return

            commit('updateState',{
                loading: true,
                nowplaying: []
            })

            try{
                const nowPlaying = await  url.nowPlaying(payload)
               commit('updateState', {
                    nowplaying: nowPlaying.data
               })
            }catch(error){
                commit('updateState',{
                    nowplaying: []
                })
            }finally{
                commit('updateState',{
                    loading: false
                })
            }
        }
    }
}


// function _fetchMovie(payload){
//     // return await axios.post('/.netlify/functions/movie', payload)
    
// }

// function _fetchMovie(payload){
//     const { title, page, id } = payload
//     const request = axios.create({
//         baseURL : 'https://api.themoviedb.org/3/',
//         params: {
//             api_key: `${TMDB_API_KEY}`,
//             langunage: 'ko-kR',
//         }
//     })

//     console.log("request: "+ request)

//     const url = {
//         nowPlaying: () => request.get("movie/now_playing"),
//         popular: () => request.get("movie/popular"),
//         movieDetail: () => 
//         request.get(`movie/${id}`,{
//             params: { append_to_response: "videos" },
//         }),
//         search: () => 
//         request.get("search/movie",{
//             params: {
//                 query: title,
//                 page: page
//             }
//         })
//     }

    
//     return new Promise((resolve, reject) => {
//         axios.get(url)
//         .then(res => {
//             console.log("url: "+ url)
//             resolve(res)
//         })
//         .catch(err => {
//             console.log("url: "+ url.search())
//             reject(err.message)
//         })
//     })
// }


// function _videoPopular(payload){
//     const { id } = payload
//     const url = id
//     ? `${movieUrl}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=${lang}`
//     : `${movieUrl}/movie/popular?api_key=${TMDB_API_KEY}&language=${lang}&page=1`

//     return new Promise((resolve, reject) => {
//         axios.get(url)
//         .then(res => {
//             resolve(res)
//         })
//         .catch(err => {
//             reject(err.message)
//         })
//     })
// }


// function _nowPlayingMovie(payload){
//     const { id } = payload
//     const url = id
//     ? `${movieUrl}/movie/${id}?api_key=${TMDB_API_KEY}&language=${lang}`
//     : `${movieUrl}/movie/now_playing?api_key=${TMDB_API_KEY}&language=${lang}&page=1`


//     return new Promise((resolve, reject) => {
//         axios.get(url)
//         .then(res => {
//             resolve(res)
//         })
//         .catch(err => {
//             reject(err.message)
//         })
//     })
// }