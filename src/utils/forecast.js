const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {

    const url = "https://api.darksky.net/forecast/"
    + "3a86fdc7e15ad649157a33abfee09437/"
    + latitude 
    + "," 
    + longitude
    + "?units=si"

    request({ url, json: true }, (error, { body }) => {    

        if(error) {
            //low-level error
            callback(chalk.red.bold.inverse("Unable to connect to weather service!"), undefined)
        } else if (body.error) {
            //coordinate error
            callback(chalk.blue.bold.inverse("Unable to find location"), undefined)
        } else {
            //no error
            const temp = body.currently.temperature 
            const preciptProb = body.currently.precipProbability 
            const temperatureHigh = body.daily.data[0].temperatureHigh
            const temperatureLow = body.daily.data[0].temperatureLow
            callback(undefined, 
                    body.daily.data[0].summary
                    +  " It is currently " 
                    +  temp 
                    + " degrees Celsius out." 
                    + " The temperature today peaks at " 
                    + temperatureHigh 
                    + " with a low of "
                    + temperatureLow 
                    + ". There is a "
                    + preciptProb
                    + "% chance of rain. ")
        }
    })
}

module.exports = forecast