const axios = require('axios')
const { TMDB_API_KEY } = process.env

const movieUrl = 'https://api.themoviedb.org/3/'
const lang = 'ko-kR'

exports.handler = async function(event){
    const payload = JSON.parse(event.body)
    const { id } = payload
    const url = id
    ?  `${movieUrl}movie/${id}/videos?api_key=${TMDB_API_KEY}&language=${lang}`
    : `${movieUrl}movie/popular?api_key=${TMDB_API_KEY}&language=${lang}&page=1`

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