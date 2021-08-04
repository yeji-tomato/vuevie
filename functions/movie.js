import { url } from "../../utils/axios";

exports.handler = async function(){
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { 
            statusCode: 200, 
            body: JSON.stringify({ data }) 
        };
    }catch(error){
        return {
            statusCode : error.response.status,
            body: error.message
        }
    }
}