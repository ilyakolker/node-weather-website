const request = require('request');

const E = exports;

E.get_location_details = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWx5YWsiLCJhIjoiY2p6M24wOWd0MDR1NTNpcXRyNGt4NHNreiJ9.eixzUCz2UzBOYAeOFq59jA&limit=1`;
    request({ url, json: true }, (error, {body}) => {
        if (error)
            callback('Unable to connect to map services!');
        else if (body.features && body.features.length === 0)
            callback('Location not found');
        else if (body.message)
            return 'Wrong request!';
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }    
    })
};

return E;

