var mykey = config.api_key;

const loading = document.querySelector(".loading");
const dataElement = document.querySelector(".data");
const temp = document.querySelector(".temp");

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const currentTime = `${hours}`;
  return currentTime;
}
const hours = [];
function makehours(hour) {
  while (hours.length < 24) {
    if (hour == "24") hour = "00";
    const formattedHour = hour.toString().padStart(2, "0");
    hours.push(`${formattedHour}:00`);
    hour++;
  }
}

async function getWeatherData(day, loc) {
  const apiKey = mykey;
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=3&aqi=no&alerts=no`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Process and use the weather data here
    console.log(data);
    // You can now access and use the weather data as needed
    document.getElementById("tempN").innerHTML = data.current.temp_c + "°";
    document.getElementById("condition").innerHTML =
      data.current.condition.text;
    const time = document.getElementById("time");
    const temps = document.getElementById("temps");

    const formattedTime = getCurrentTime();
    makehours(formattedTime);

    for (let i = 0; i < time.children.length; i++) {
      time.children[i].innerHTML = hours[i];

      temps.children[i].setAttribute("id", hours[i]);
      /*   let c = document.createElement("td");
      c.setAttribute("id", hours[i]);
      temps.appendChild(c);*/
    }

    for (let id = 0; id < temps.children.length; id++) {
      const targetTime = temps.children[id].getAttribute("id"); // Get the target time
      if (targetTime !== "00:00") {
        for (
          let index = 0;
          index < data.forecast.forecastday[day].hour.length;
          index++
        ) {
          const element = data.forecast.forecastday[day].hour[index];
          if (element.time.split(" ")[1] === targetTime) {
            temps.children[id].innerHTML = element.temp_c + "°";
            break; // Break the loop once a match is found
          }
        }
      } else {
        // Continue the loop with data.forecast.forecastday[day+1].hour
        for (
          let index = 0;
          index < data.forecast.forecastday[day + 1].hour.length;
          index++
        ) {
          const element = data.forecast.forecastday[day + 1].hour[index];
          if (element.time.split(" ")[1] === targetTime) {
            temps.children[id].innerHTML = element.temp_c + "°";
            break; // Break the loop once a match is found
          }
        }
      }
    }

    loading.style.display = "none";
    temp.style.display = "flex";
    dataElement.style.display = "block";
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Call the async function to fetch weather data
getWeatherData(0, "Agadir");

const daySelect = document.getElementById("day");
const locSelect = document.getElementById("loc");

daySelect.addEventListener("change", () => {
  getWeatherData( parseInt(daySelect.value),  locSelect.value);
});

locSelect.addEventListener("change", () => {
  getWeatherData( parseInt(daySelect.value),  locSelect.value);
});
