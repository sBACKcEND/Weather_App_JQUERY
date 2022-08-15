$(document).ready(function () {
  getWeather();

  function getWeather() {
    let accessKey = "a1da4413ffbaf37616fb813495d8358d";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Klaipėda,lt&APPID=${accessKey}`;

    // console.log(apiURL);

    $.get(apiURL, function (data) {
      $("#city").html(data.name);
      $("#temperature").html(Math.floor(data.main.temp - 273) + "°C");
      $("#weather_description").html(data.weather[0].description);
    });
  }
});
