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
                const search = await _searchDetail({
                    ...payload
                })
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

            if(state.loading) return

            commit('updateState',{
                loading: true,
                theMovie: [],
                video: []
            })

            try{
               const theMovie = await _searchDetail(payload)
               const video = await _videoPopular(payload)
               commit('updateState', {
                   theMovie: theMovie.data,
                   video: video.data
               })
            }catch(error){
                commit('updateState',{
                    theMovie: [],
                    video: []
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
                const popular = await _videoPopular(payload)
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
                const nowPlaying = await _nowPlaying(payload)
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


async function _searchDetail(payload){
    return await axios.post('/.netlify/functions/searchDetail', payload) 
}

async function _videoPopular(payload){
    return await axios.post('/.netlify/functions/videoPopular', payload) 
}

async function _nowPlaying(payload){
    return await axios.post('/.netlify/functions/nowPlaying', payload) 
}
