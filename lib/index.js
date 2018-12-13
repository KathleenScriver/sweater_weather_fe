
$('#change-location-popup').hide();

$('#change-location-button').on('click', () => {
  $('#change-location-popup').show();
  $('#location-input').focus();
});

$('#cancel').on('click', () => $('#change-location-popup').hide());

const getForecast = () => {
  const location = $('#location-input').val() ? $('#location-input').val() : "Denver, CO";
  localStorage.setItem('location', location);
  getImage();

  fetch(`https://sweater-weather-ky.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(forecast => displayForecast(forecast))
    .catch(error => console.error({ error }));

  $('#change-location-popup').hide();
  $('#city-state').text(location);
};

const getImage = () => {
  // e.preventDefault();
  let imageLocation = localStorage.getItem('location');

  fetch(`https://sweater-weather-ky.herokuapp.com/api/v1/background?location=${imageLocation}`)
  .then(response => response.json())
  .then(imageData => setImage(imageData))
  .catch(error => console.error({ error }));
};

const setImage = (imageData) => {
  const imagePath = imageData.data.attributes.location_image;
  $('body').css('background-image', `url(${imagePath})`);
};

const displayForecast = (forecast) => {
  $('#location-input').val('');
  let forecastData = forecast.data.attributes;
  setLocationNowSection(forecastData);
  // setDetailsSection();
  setHourlySection(forecastData.hourly_temps.data);
  // setDailySection();
};


const setLocationNowSection = (daily_attributes) => {
  setTimeDate(daily_attributes.current_weather.data.attributes.time);
  setNowForecast(daily_attributes);
};

const setNowForecast = (attributes) => {
  const dailyData = attributes.current_weather.data.attributes
  $('#now-description .text').text(dailyData.summary);
  $('#location-now-icon').attr('src', `assets/${dailyData.icon}.png`);
  $('#now-temp .text').text(Math.round(dailyData.temperature));
  $('#now-high-number').text(Math.round(attributes.daily_weather.data[0].attributes.temp_high));
  $('#now-low-number').text(Math.round(attributes.daily_weather.data[0].attributes.temp_low));
};

const setTimeDate = (unixTime) => {
  const dayTime = moment.unix(unixTime);
  const formattedDay = dayTime.format("hh:mm a, M/D");
  $('#time-date').text(formattedDay);
}

const setHourlySection = (hourlyData) => {
  $('#hourly-forecast-section').empty();
  for(let i = 0; i < 9; i++) {
    let temp = Math.round(hourlyData[i].attributes.temperature);
    let time = hourlyData[i].attributes.time;
    $('#hourly-forecast-section').append(`<div><p class='time'>${time}</p><p class='temp'>${temp}<img src='assets/circle-shape-outline.png', alt='degree symbol' class='md-deg-symbol'></p></div>`)
  };
};

getForecast();

$('#photo-button').on('click', getImage);

$('#location-set-button').on('click', getForecast);
