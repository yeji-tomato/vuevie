const axios = require('axios')
const { TMDB_API_KEY } = process.env

const request = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    params: {
        api_key: `${TMDB_API_KEY}`,
        language: 'ko-kR',
    }
})

exports.handler = async function(event){
    const payload = JSON.parse(event.body)
    const { id } = payload

    try {
        const { data } = await request.get(`movie/${id}`, 
        {
            params: { append_to_response: "videos" },
        })
        console.log(data)
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