const request = require('request');

const E = exports;

E.get_forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/ee659624f9a19495e32427a2bdbd658c/${longitude},${latitude}?units=si`;
    request({ url, json: true }, (error, {body}) => {
        if (error)
            callback('Unable to connect to Weather services');
        else if (body.error)
            callback('Unable to find location');
        else {
            callback(undefined,{message:`${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees and it is ${body.currently.precipProbability}% chance of rain`,daily: body.daily});
        }
    });
} 