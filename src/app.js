const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//express is just a single function
const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) // tell hbs where our partials are

//set up static directory to serve
app.use(express.static(publicDir))



app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Christian'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Christian'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: 'This is my super cool message here haha',
        name: 'Christian'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location: location
            })
            // res.render('help', {
            //     title: "Help Page",
            //     message: 'Data for '+ data.location+": "+forecastData,
            //     name: 'Christian'
            // })
        })
    })


})
app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "you must provide a serach term"
        })
    }
    console.log(req.query.name)
    res.send({
        products: []
    })

})
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: "help 404 not found",
        message: 'This help page does not exist',
        name: 'Christian'
    })
})
app.get('/*', (req, res) => {
    res.render('404page', {
        title: "404 not found",
        message: 'generic page not found',
        name: 'Christian'
    })

})
app.listen(port, ()=>{
    console.log('server is up on port'+port)
})