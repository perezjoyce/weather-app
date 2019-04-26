//LOAD IN EXPRESS LIBRARY 
const path = require('path') //core module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//process.env.PORT for heroku
// 3000 for local
//OR allows our app to have a default fallback
const port = process.env.PORT || 3000

//DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

//SETUP HANDLEBARS, ENGINE, AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //render one of your views
    res.render('index', {
        title: 'Weather',
        location : 'Philippines',
        comment: 'Use this site to get your weather',
        name: 'Joyce Perez',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joyce Perez',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Joyce Perez',
        message: "This is the help page."
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    //call geocode
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { 

        if (error) {
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })   
    })
})

//create second URL to send back JSON
app.get('/products', (req, res) => {
    //when there is no search term
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term.'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//match any page that starts with help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Joyce Perez',
        message: "Help article not found."
    })
})


//for 404 page; should come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Joyce Perez',
        message: "Page not found"
    })
})



//START UP THE SERVER (3000 is a common development port)
app.listen(port, () => {
    console.log('Server is up on port' + port + '.') //not displayed on the browser
})

