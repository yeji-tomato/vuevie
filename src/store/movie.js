import axios from 'axios'

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
           if(state.loading) return

            commit('updateState',{
                loading: true
            })

            try{
                const res = await _fetchMovie({
                    ...payload
                })
                const { results, total_pages } = res.data
                commit('updateState', {
                    movies: results,
                    pages : total_pages,
                    title: payload.title
                })
            }catch(message){
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
            if(state.loading) return

            commit('updateState',{
                loading: true,
                theMovie: []
            })

            try{
                const res = await _fetchMovie(payload)
                const video = await _videoPopular(payload)
               commit('updateState', {
                   theMovie: res.data,
                   video: video.data
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
                const res = await _videoPopular(payload)
               commit('updateState', {
                    popular: res.data
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
                const res = await _nowPlayingMovie(payload)
               commit('updateState', {
                    nowplaying: res.data
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

const movieUrl = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = 'cb772a50acc4cd6917b12854484b9d91'
const lang = 'ko-kR'

function _fetchMovie(payload){
    const { title, page, id } = payload
    const url = id
    ? `${movieUrl}/movie/${id}?api_key=${TMDB_API_KEY}&language=${lang}`
    : `${movieUrl}/search/movie?api_key=${TMDB_API_KEY}&language=${lang}&query=${title}&page=${page}`
    
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err.message)
        })
    })
}


function _videoPopular(payload){
    const { id } = payload
    const url = id
    ? `${movieUrl}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=${lang}`
    : `${movieUrl}/movie/popular?api_key=${TMDB_API_KEY}&language=${lang}&page=1`

    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err.message)
        })
    })
}


function _nowPlayingMovie(payload){
    const { id } = payload
    const url = id
    ? `${movieUrl}/movie/${id}?api_key=${TMDB_API_KEY}&language=${lang}`
    : `${movieUrl}/movie/now_playing?api_key=${TMDB_API_KEY}&language=${lang}&page=1`


    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err.message)
        })
    })
}