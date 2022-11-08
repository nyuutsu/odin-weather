const destinationUnknown = {
  name: "Unknown",
  country: "",
  summary: "Unknown",
  description: "",
  ["temperature-c"]: "",
  ["temperature-f"]: "",
  lon: "",
  lat: ""
}

const getDataFromAPI = async (query) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query.input.value}&APPID=7fb485fb21d0ea78ca5d85374b7c2ff3`, {mode: 'cors'})

const parseDataFromAPI = async (dataFromAPI) => dataFromAPI.json()

const synthesizeData = async (data) => {
  return {
    name: data.name,
    country: `(${data.sys.country})`,
    summary: data.weather[0]["main"],
    description: data.weather[0]["description"],
    ["temperature-f"]: `${Math.round(1.8 * (Number(data.main.temp)-273) + 32)}f`,
    ["temperature-c"]: `${Math.round(Number(data.main.temp)-273.15)}c`,
    lon: `${data.coord.lon})`,
    lat: `(${data.coord.lat},`
  }
}

const renderWeather = async (weather) => Object.keys(weather).forEach(key => document.querySelector(`.${key}`).textContent = weather[key])

const setImage = async (weather) => document.getElementById('weatherPic').src = `images/${weather.summary}`

const process = async (input) => { 
  const dataFromAPI = await getDataFromAPI(input)
  if(dataFromAPI.ok) {  
    const parsedData = await parseDataFromAPI(dataFromAPI)
    const preparedData = await synthesizeData(parsedData)
    renderWeather(preparedData)
    setImage(preparedData)
  } else {
    renderWeather(destinationUnknown)
    setImage(destinationUnknown)
  }
}

tempButton.addEventListener('click', () => {
  document.querySelectorAll('.temp-result').forEach((item) => {item.classList.toggle('hidden')})
})