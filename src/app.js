const path = require('path');
const express = require('express');
const hbs = require('hbs');
const utils = require('./utils/geo_code');
const utils_forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const path_to_public_dir = path.join(__dirname, '../public');
const view_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partials_path);

// Setup static dir to serve
app.use(express.static(path_to_public_dir));

// pages for app
const pages = {
    about: 'about',
    help: 'help',
    weather: 'weather'
};

// my name for rendering name in app.get
const name = 'ilya';

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    });
});

app.get(`/${pages.about}`, (req, res) => {
    res.render(pages.about, {
        title: pages.about,
        name
    });
});

app.get(`/${pages.help}`, (req, res) => {
    res.render(pages.help, {
        title: pages.help,
        name,
        message: 'This is a message from app.js'
    });
});

app.get(`/${pages.weather}`, (req, res) => {
    if (!req.query.addr) 
        return res.send({error: 'Please enter a location'});
    utils.get_location_details(req.query.addr, (error, { latitude, longitude, location }={}) => {
        if (error)
            return res.send({error});
        utils_forecast.get_forecast(longitude, latitude, (error, data) => {
            if (error) 
                return res.send({error});
            res.send({
                location,
                address: req.query.addr,
                forecast: data.message,
                daily_forecast : data.daily
            })
        });
    });
});

app.get('/products', (req, res) => {

})

app.get(`/${pages.help}/*`, (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name
    });
});

app.listen(port, () => {
    console.log(`
-------------------------------------
-                                   -
-    use 'http://127.0.0.1:${port}  -
-                                   -
-------------------------------------`);
})