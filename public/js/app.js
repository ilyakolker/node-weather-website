console.log('Client Side JS');




const weather_form = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

const days = document.querySelectorAll('.day_temp');

const body = document.querySelector('body');
weather_form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('http://127.0.0.1:3000/weather?addr=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error)
                return message1.textContent = data.error;
            message1.textContent = data.location;
            message2.innerText = data.forecast;
            console.log(data);
            for (let i = 0; i < data.daily_forecast.data.length-1; i++) {
                days[i].textContent = `${data.daily_forecast.data[i].apparentTemperatureLow}-${data.daily_forecast.data[i].apparentTemperatureHigh}`;
                
            }
        });
    });
});