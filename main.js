$(document).ready(function () {
  $("#city_form").submit(function (event) {
    event.preventDefault();
    let cityInput = $("#city_name");
    let cityName = cityInput.val();
    if (cityName == "" || cityName != "name") {
      alert("Please provide a valid city");
    }
    cityInput.val("");
    getWeather(cityName);
  });

  function getWeather(cityName) {
    let city = cityName;
    let accessKey = "a1da4413ffbaf37616fb813495d8358d";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${accessKey}`;

    // console.log(apiURL);

    $.get(apiURL, function (data) {
      let { name } = data;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
      let { icon } = data.weather[0];

      document.querySelector("#icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      $("#city").html(data.name + "," + " " + data.sys.country);
      $("#temperature").html(Math.floor(data.main.temp - 273) + "°C");
      $("#weather_description").html(data.weather[0].description);
      $("#wind").html("Wind speed: " + data.wind.speed + "km/h");
      $("#humidity").html("Humidity: " + data.main.humidity + "%");
    });
  }
});
