$(function(){

//make it so that the search button takes take the name and compares it to a known location
$('.btn').click(getWeatherData)
function getWeatherData() {
  $('.FiveDayWeather').empty();
  $('.todayWeather').empty();
  //this variable will take whatever is entered into the search bar.
var cityName = $(".searchBox").val();
var apiKey = '61a477e0f271f86de40ea26ea7078597'
//fetches the forecast data
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`, {
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  //the forecast variable filters through all the data to find the noon forecast for all 5 days
  var forecast = data.list.filter(function(weatherData) {
      return weatherData.dt_txt.includes("12:00:00");
    });
    forecast.forEach(function(weatherData) {
      //these are all the 5 day forecast variables
      var date = new Date(weatherData.dt_txt);
      var dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      var temp = weatherData.main.temp.toFixed(0);
      var humidity = weatherData.main.humidity;
      var iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      var iconAlt = weatherData.weather[0].description;
      var forecastItem = $("<div>").addClass("column is-one-fifth box");
      forecastItem.append($("<p>").text(dayOfWeek));
      forecastItem.append($("<img>").attr("src", iconUrl).attr("alt", iconAlt));
      forecastItem.append($("<p>").text(`Temperature: ${temp}°F`));
      forecastItem.append($("<p>").text(`Humidity: ${humidity}%`));
      $(".FiveDayWeather").append(forecastItem);
 });
  
});
//this is going to be fetching the weather data for the current day
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`, {
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  //all these variables are the data for todays weather
      var city = data.name
      var temp = data.main.temp.toFixed(0);
      var humidity = data.main.humidity;
      var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      var iconAlt = data.weather[0].description;
      var todaysWeatherItem = $("<div>").addClass("box");
      todaysWeatherItem.append($("<p>").text(city));
      todaysWeatherItem.append($("<img>").attr("src", iconUrl).attr("alt", iconAlt));
      todaysWeatherItem.append($("<p>").text(`Temperature: ${temp}°F`));
      todaysWeatherItem.append($("<p>").text(`Humidity: ${humidity}%`));
      $(".todayWeather").append(todaysWeatherItem);
    });
    logSearch(cityName)
};
//this function logs cities typed into the search into the search history local storage
function logSearch(cityName) {
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var searchItem = { city: cityName, date: new Date()};
searchHistory.push(searchItem);
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
displaySearchHistory();
  }

//this function displays the search history from local storage
function displaySearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    var searchHistoryList = $('.searchHistoryList');
    searchHistoryList.empty();
    //this variable makes sure there are no repeat cities in the search history
    var uniqueSearchHistory =[...new Set(searchHistory.map(item => item.city))];
    uniqueSearchHistory.filter(Boolean).forEach(function(search) {
      //this variable makes the search history clickable so you can just click and get information about that city
      var searchItem = $('<button>').addClass('column is-half button').text(search);
      searchItem.click(function(){
        $('.searchBox').val(search);
        getWeatherData();
      });
      searchHistoryList.append(searchItem);
    });
  }
displaySearchHistory();


});
