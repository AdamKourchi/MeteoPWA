var mykey = config.api_key;

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const currentTime = `${hours}`;
    return currentTime;
}
const hours = [];
function makehours(hour) {
    
while (hours.length<24){
    if(hour == "24")hour="00"
    const formattedHour = hour.toString().padStart(2, '0');
    hours.push(`${formattedHour}:00`);
    hour++
}

}

async function getWeatherData() {
    const apiKey =  mykey;
    const city = 'Khemisset'; // Replace with  desired city or location

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Process and use the weather data here
        console.log(data);
        // You can now access and use the weather data as needed
        document.getElementById('tempN').innerHTML=data.current.temp_c+'°'
        document.getElementById('condition').innerHTML=data.current.condition.text
        const time = document.getElementById('time')
        const temps = document.getElementById('temps')

         
     const formattedTime = getCurrentTime();   
     makehours(formattedTime)
     for (let i = 0; i < time.children.length; i++) {
        time.children[i].innerHTML=hours[i]
        let c = document.createElement('td')
        c.setAttribute('id',hours[i])
        temps.appendChild(c)
     }
      
     /*for (let id = 0; id < temps.children.length; id++) {
        data.forecast.forecastday[0].hour.forEach(element => {
           
            if (element[0].time.split(' ')[1] == temps.children[id] && temps.children[id] != "00:00") {
                temps.children[id].innerHTML = element[0].temp_c+'°';
                
            }
        }
        });*/

        for (let id = 0; id < temps.children.length; id++) {
            const targetTime = temps.children[id].getAttribute('id'); // Get the target time
            if (targetTime !== "00:00") {
                for (let index = 0; index < data.forecast.forecastday[0].hour.length; index++) {
                    const element = data.forecast.forecastday[0].hour[index];
                    if (element.time.split(' ')[1] === targetTime) {
                        temps.children[id].innerHTML = element.temp_c + '°';
                        break; // Break the loop once a match is found
                    }
                }
            } else {
                // Continue the loop with data.forecast.forecastday[1].hour
                for (let index = 0; index < data.forecast.forecastday[1].hour.length; index++) {
                    const element = data.forecast.forecastday[1].hour[index];
                    if (element.time.split(' ')[1] === targetTime) {
                        temps.children[id].innerHTML = element.temp_c + '°';
                        break; // Break the loop once a match is found
                    }
                }
            }
        }

    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
      
        
    }
}

// Call the async function to fetch weather data
getWeatherData();


