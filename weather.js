$(document).ready(function() {

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=e53799e1f791c650a5fdbfc9a7b50327&units=imperial";

    var getWeather = function(data) {
      console.log(data);

      var place = data.name + ", " + data.sys.country;
      $("#location-city").html(place);
      
      var currentdate = new Date(); 
      var date = currentdate.toDateString();
      
      $("#time").append(((currentdate.getHours() < 10)?"0":"") + currentdate.getHours() + ":" + ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() + " " + date);
      
      
            
      var tempis = data.main.temp;
      tempis = tempis.toFixed(0);
      $("#location-weather").html("<span class='big'>" + tempis + "</span> &#8457;");

      $('input:radio[name="inlineRadioOptions"]').change(function() {
        if ($(this).val() == 'option1') {
          tempis = (data.main.temp - 32) * 5 / 9;
          tempis = tempis.toFixed(0);
          $("#location-weather").html("<span class='big'>" + tempis + '</span> &#8451;');
        } else {
          tempis = data.main.temp;
          tempis = tempis.toFixed(0);
          $("#location-weather").html("<span class='big'>" + tempis + "</span> &#8457;");
        }
      });
      //add wind speed
      var windIs = data.wind.speed;
      $("#wind-text").append(windIs.toFixed(0) + " mph");

      $('input:radio[name="inlineRadioOptions2"]').change(function() {
        if ($(this).val() == 'option1') {
          windIs = (data.wind.speed * 1.60934);
          windIs = windIs.toFixed(0);
          $("#wind-text").html("Wind: " + windIs + " km/h");
        } else {
          windIs = data.wind.speed;
          windIs = windIs.toFixed(0);
          $("#wind-text").html("Wind: " + windIs + " mph");
        }
      });

      //use data.weather[0].icon or code?
      // can then use openweather site to get their icons that correspond see http://openweathermap.org/weather-conditions
      
      var weatherMain = data.weather[0].main;
      $("#weather-description").append(weatherMain);    
      var weatherMainCode = data.weather[0].icon;
      var imageLink = 'http://openweathermap.org/img/w/' + weatherMainCode + '.png';
      $("#location-image").attr('src', imageLink);
      $("#location-image").attr('alt', weatherMain);
    };

    $.get(weatherApiUrl, getWeather, 'jsonp');

    $("#settings-button").click(function() {
      $("#settings-box").toggle();
      $("#weather-display").toggleClass("long");
      
    });

  });

}
});
