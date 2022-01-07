//var latLonAPI = `https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=${APIKey}`
var APIKey = "c40b28aa33c2bef2881ab9e4f13c3ef7"
var selectedCityForm = document.querySelector("#user-form");
var selectedCityInput = document.querySelector("#city-input");
var seletcedCityBtn = document.querySelector(".btn");
var forecast = document.querySelector("#forecast-card");
var fiveDayContainerEl = document.querySelector(".fiveDayContainer");
var searchHistoryContainer = document.querySelector(".searchHistory");


//Get city information from input
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = selectedCityInput.value.trim()
    if(city){
        getLatLon(city);
        city.value = "";
    } else {
        alert("Please enter a name of a city");
    }
};

//Get Latitude and Longitude for chosen city
function getLatLon(city) {
    var latLonAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c40b28aa33c2bef2881ab9e4f13c3ef7`
    fetch(latLonAPI).then(function(res){
        return res.json();
    }).then(function(data){
        console.log("I'm working")
        getWeather(data.coord.lat, data.coord.lon, city) 
    })
};

//Get the weather for the city
function getWeather (lat, lon, city){
    var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=${APIKey}`
    fetch(oneCallAPI).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data)
        
        var cityEl = document.createElement("h3");
        var currentWeatherBadge = document.createElement("img");
        var dateEl = document.createElement("h5");
        var tempEl = document.createElement("h6");
        var windEl = document.createElement("h6");
        var humidityEl = document.createElement("h6");
        var indexEl = document.createElement("h6");
        var uvBtnEl = document.createElement("button");
        uvBtnEl.setAttribute("class", "uv-btn");
        //currentWeatherBadge.classList.add("img-fluid")
        //currentWeatherBadge.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`);
        
        
        cityEl.innerText = `${city} `;
        //currenWeatherBadge.innerText = `${currentWeatherBadge}`;
        dateEl.innerText = ` (${moment().format('L')})`;
        tempEl.innerText =`Temp: ${data.current.temp} degrees Farhenheit`;
        windEl.innerText = `Wind: ${data.current.wind_speed} MPH`;
        humidityEl.innerText = `Humidity: ${data.current.humidity}%`;
        indexEl.innerText = `UV Index: `
        
        forecast.append(cityEl, dateEl, tempEl, windEl, humidityEl, indexEl);
        indexEl.append(uvBtnEl);
        showIndex(data.current.uvi)


        for (var i = 1; i < 6; i++) {
            var cardEl = document.createElement("div");
            cardEl.classList.add("card", "text-white", "bg-dark", "col-2");
            cardEl.setAttribute("style", "max-width: 18rem;")

            fiveDayContainerEl.appendChild(cardEl);
            
            var weatherBadge = document.createElement("img");
            weatherBadge.classList.add("card-image-top");
            weatherBadge.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
            cardEl.appendChild(weatherBadge);

            var cardHeader =document.createElement("div");
            cardHeader.classList.add("card-header");
            var cardDateEl = document.createElement("h4");
            cardDateEl.innerText = ` (${moment().add(i, 'days', 1).format('L')})`;
            cardHeader.appendChild(cardDateEl);
            cardEl.appendChild(cardHeader);

            
            var cardBodyEl = document.createElement("div");
            cardBodyEl.classList.add("card-body", "text-dark");
            cardHeader.appendChild(cardBodyEl);
            
            var cardTitleEl = document.createElement("h5");
            cardTitleEl.classList.add("card-title")
            cardBodyEl.appendChild(cardTitleEl);

            var cardTextEl = document.createElement("p");
            cardTextEl.classList.add("card-text");
            cardTitleEl.appendChild(cardTextEl);
            
            var cardTempEl = document.createElement("p");
            cardTextEl.classList.add("text-white");
            var cardWindEl = document.createElement("p");
            cardWindEl.classList.add("text-white");
            var cardHumidityEl = document.createElement("p");
            cardHumidityEl.classList.add("text-white");
            
            cardTempEl.innerText =`Temp: ${data.daily[i].temp.day} degrees F`;
            cardWindEl.innerText = `Wind: ${data.daily[i].wind_speed} MPH`;
            cardHumidityEl.innerText = `Humidity: ${data.daily[i].humidity}%`;

            cardTextEl.append(cardTempEl, cardWindEl, cardHumidityEl);
        }
    })
};


function showIndex(uvi) {
    var uvBtn = document.querySelector(".uv-btn");
    
    if(uvi <= 3){
        uvBtn.textContent = uvi;
            uvBtn.classList.add("p-1", "rounded", "bg-success", "text-white")
        } else if(uvi >3 && uvi <= 8 ) {
           uvBtn.textContent = uvi;
            uvBtn.classList.add("p-1", "rounded", "bg-warning", "text-white")
        } else {
            uvBtn.textContent = uvi;
            uvBtn.classList.add("p-1", "rounded", "bg-danger", "text-white")
        }
};
 function showSearchHistory() {

 }
selectedCityForm.addEventListener("submit", formSubmitHandler);

