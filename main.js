$(document).ready(function () {
  $("#city_form").submit(function (event) {
    event.preventDefault();
    let cityInput = $("#city_name");
    let cityName = cityInput.val();
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
      let date = new Date();
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
      $("#date").html(date.toDateString());

      function currentTime() {
        let today = new Date(); /* creating object of Date class */
        let hour = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();
        let midday = "AM";
        midday = hour >= 12 ? "PM" : "AM"; /* assigning AM/PM */
        hour =
          hour == 0
            ? 12
            : hour > 12
            ? hour - 12
            : hour; /* assigning hour in 12-hour format */
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        document.getElementById("today").innerText =
          hour +
          ":" +
          min +
          ":" +
          sec +
          " " +
          midday; /* adding time to the div */
        let t = setTimeout(currentTime, 1000); /* setting timer */
      }

      function updateTime(k) {
        /* appending 0 before time elements if less than 10 */ if (k < 10) {
          return "0" + k;
        } else {
          return k;
        }
      }
      currentTime();

    }).catch(function () {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please provide a valid city!",
      });
    });
  }
});
