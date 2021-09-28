
const request = require('request')


const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d46b38025764448ffa253b833b2d31e7&query='+latitude+','+longitude+'&units=f'
    request({url: url, json:true}, (error,response) =>{
        if(error){
            callback('unable to connect', undefined)
        }
        else if (response.body.error){
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined,'It is currently ' + response.body.current.temperature + ' degrees Fahrenheit and the condition is: ' +response.body.current.weather_descriptions)
        
        }


    })
}



module.exports = forecast
