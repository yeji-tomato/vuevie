import axios from 'axios'

const { TMDB_API_KEY } = process.env

const request = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    params: {
        api_key: `${TMDB_API_KEY}`,
        language: 'ko-kR',
    }
})

export const url = {
    nowPlaying: () => request.get("movie/now_playing"),
    popular: () => request.get("movie/popular"),
    movieDetail: (id) => 
    request.get(`movie/${id}`,{
        params: { append_to_response: "videos" },
    }),
    search: (title, page) => 
    request.get("search/movie",{
        params: {
            query: title,
            page: page
        }
    })
}