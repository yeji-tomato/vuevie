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
                const search = await _search({
                    ...payload
                })
            
                const { results, total_pages } = search.data
                commit('updateState', {
                    movies: results,
                    pages : total_pages,
                    query: payload.query
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
                theMovie: []
            })

            try{
               const theMovie = await _detail(payload)
            //    const video = await _videoPopular(payload)
               commit('updateState', {
                   theMovie: theMovie.data
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
                const popular = await _popular(payload)
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

async function _search(payload){
    return await axios.post('/.netlify/functions/search', payload) 
}

async function _detail(payload){
    return await axios.post('/.netlify/functions/detail', payload) 
}

async function _popular(payload){
    return await axios.post('/.netlify/functions/popular', payload) 
}

async function _nowPlaying(payload){
    return await axios.post('/.netlify/functions/nowPlaying', payload) 
}
