//Seleção de elementos
const apiKey = "3c14ad7f74f22fe25409987eff325dcc";
const apiUnsplashKey = "Qdgtb1ZdI3M4IIGWCgRkTLcmd_jSk2_kcqf39Xd_Oy0";
const apiCountryURL = "https://flagcdn.com/16x12/br.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");


//Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json()

    return data  
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return
    }

    errorMessageContainer.classList.add("hide");

    cityElement.textContent = data.name;
    tempElement.textContent = parseInt(data.main.temp);
    descElement.textContent = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagcdn.com/16x12/${data.sys.country.toLowerCase()}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`

    const backgroundUrl = await getCityImage(city);

    if(backgroundUrl) {
        document.body.style.backgroundImage = `url("${backgroundUrl}")`;
        document.body.style.backgroundSize = "cover";       
        document.body.style.backgroundPosition = "center";  
        document.body.style.backgroundRepeat = "no-repeat";
    }

    weatherContainer.classList.remove('hide')
}

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    weatherContainer.classList.add("hide");
}

const getCityImage = async (city) => {
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiUnsplashKey}&orientation=landscape&per_page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.results.length > 0) {
            return data.results[0].urls.regular;
        } else {
            return null //não achou nenhuma foto
        }
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        return null
    }
}

//Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  if (city) {
    showWeatherData(city);
  }
});

cityInput.addEventListener("keyup", (e) => {  //pesquisar quando clicar no enter
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }  
})