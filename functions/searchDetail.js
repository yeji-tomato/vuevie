const axios = require('axios')
const { TMDB_API_KEY } = process.env

const movieUrl = 'https://api.themoviedb.org/3/'
const lang = 'ko-kR'

exports.handler = async function(event){
    const payload = JSON.parse(event.body)
    const { title, page, id } = payload
    const url = id
    ? `${movieUrl}movie/${id}?api_key=${TMDB_API_KEY}&language=${lang}`
    : `${movieUrl}search/movie?api_key=${TMDB_API_KEY}&language=${lang}&query=${title}&page=${page}`

    try {
        const { data } = await axios.get(url)
        if(data.Error){
            return {
                statusCode: 400,
                body: data.Error
            }
        }
        return{
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }catch(error){
        return {
            statusCode : error.response.status,
            body: error.message
        }
    }
}