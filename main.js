$(document).ready(function () {
  getWeather();

  function getWeather() {
    let accessKey = "a1da4413ffbaf37616fb813495d8358d";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=klaipeda,lt&APPID=${accessKey}`;

    // console.log(apiURL);

    $.get(apiURL, function (data) {
      let { name } = data;
      let { icon } = data.weather[0];
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";

      $("#city").html(data.name);
      $("#temperature").html(Math.floor(data.main.temp - 273) + "°C");
      $("#weather_description").html(data.weather[0].description);
      document.querySelector("#icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
    });
  }
});
