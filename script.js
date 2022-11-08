/*Use everything we’ve been discussing to create a weather forecast site using the weather API from the previous lesson. You should be able to search for a specific location and toggle displaying the data in Fahrenheit or Celsius.

You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather. (You could even use the Giphy API to find appropriate weather-related gifs and display them). Feel free to use promises or async/await in your code, though you should try to become comfortable with both.*/

const resultName = document.querySelector('.result-name')
const resultSummary = document.querySelector('.result-summary')
const resultDescription = document.querySelector('.result-description')
const resultTemp = document.querySelector('.result-temp')

const getDataFromAPI = async (query) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query.input.value}&APPID=7fb485fb21d0ea78ca5d85374b7c2ff3`, {mode: 'cors'})


const parseDataFromAPI = async (dataFromAPI) => dataFromAPI.json()

const reduceDataFromAPI = async (data) => {
  return {
    name: data.name,
    summary: data.weather[0]["main"],
    description: data.weather[0]["description"],
    temperature: data.main.temp,
    coord: {
      lon: data.coord.lon,
      lat: data.coord.lat
    }
  }
}

const renderWeather = async (weather) => {
  resultName.textContent = weather.name
  resultSummary.textContent = weather.summary
  resultDescription.textContent = weather.description
  resultTemp.textContent = weather.temperature
}

const process = async (input) => {
  const dataFromAPI = await getDataFromAPI(input)
  const parsedData = await parseDataFromAPI(dataFromAPI)
  const reducedData = await reduceDataFromAPI(parsedData)
  renderWeather(reducedData)
}