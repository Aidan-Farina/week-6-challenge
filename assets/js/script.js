$(function(){

//make it so that the search button takes take the name and compares it to a known location
$('.btn').click(getWeatherData)
function getWeatherData() {
  $('.FiveDayWeather').empty();
  $('.todayWeather').empty();
var cityName = $(".searchBox").val();
var apiKey = '61a477e0f271f86de40ea26ea7078597'
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`, {
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  var forecast = data.list.filter(function(weatherData) {
      return weatherData.dt_txt.includes("12:00:00");
    });
    forecast.forEach(function(weatherData) {
      var date = new Date(weatherData.dt_txt);
      var dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      var temp = weatherData.main.temp.toFixed(0);
      var humidity = weatherData.main.humidity;
      var iconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      var iconAlt = weatherData.weather[0].description;
      var forecastItem = $("<div>").addClass("box");
      forecastItem.append($("<p>").text(dayOfWeek));
      forecastItem.append($("<img>").attr("src", iconUrl).attr("alt", iconAlt));
      forecastItem.append($("<p>").text(`Temperature: ${temp}°F`));
      forecastItem.append($("<p>").text(`Humidity: ${humidity}%`));
      $(".FiveDayWeather").append(forecastItem);
 });
  logSearch(cityName)
});
}

function logSearch(cityName) {
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
searchHistory.push({ city: cityName});
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
displaySearchHistory();
  }


function displaySearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    var searchHistoryList = $('.searchHistoryList');
    searchHistoryList.empty();
    searchHistory.forEach(function(search) {
      var searchItem = $('<button>').text(search.city);
      searchHistoryList.append(searchItem);
    });
  }
displaySearchHistory();



//log searched areas to search history

//show todays weather based on location searched

//show the 5 day forecast based on location searched

});