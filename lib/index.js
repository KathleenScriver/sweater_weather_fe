
$('#change-location-popup').hide();

$('#change-location-button').on('click', () => {
  $('#change-location-popup').show();
  $('#location-input').focus();
});

$('#cancel').on('click', () => $('#change-location-popup').hide());

const getForecast = () => {
  const location = $('#location-input').val() ? $('#location-input').val() : "Denver, CO";

  fetch(`https://sweater-weather-ky.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(forecast => displayForecast(forecast))
    .catch(error => console.error({ error }));

  $('#change-location-popup').hide();
  $('#city-state').text(location);
};

const displayForecast = (forecast) => {
  $('#location-input').val('');
  setLocationNowSection(forecast.data.attributes);
  // setDetailsSection();
  // setHourlySection();
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

getForecast();

$('#location-set-button').on('click', getForecast);
