const request = require('request')

const geocode = (address, callback) => {
    /*pass address into a function called encodeURIComponent 
    to prevent the program from crashing when someone location 
    that contains special characters that means something in a url structure like ? */
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" 
    + encodeURIComponent(address) 
    + ".json?access_token=pk.eyJ1Ijoiam95Y2VwZXJleiIsImEi" 
    + "OiJjanV1eW14OXAwZWg4NDlueTZwcTZvOGduIn0.0YdkKZKKRKrcazOQlBWJvg&limit=1"

    request({ url, json: true}, (error, { body }) => {

            if(error){
                callback("Unable to connect to the internet.", undefined)
            } else if (body.features.length === 0) {
                callback("Unable to find location. Try another search.", undefined)
            } else {
                // console.log(response.body.features.length) // 0
                const longitude = body.features[0].center[0]
                const latitude = body.features[0].center[1]
                /*lat, long, and loc are inside an obj 
                so they can be accessed later on*/
                callback(undefined, {
                    latitude, 
                    longitude, 
                    location: body.features[0].place_name
                })
            }
        })
}

module.exports = geocode