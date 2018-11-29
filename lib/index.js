$('#change-location-popup').hide();

$('#change-location-button').on('click', () => {
  $('#change-location-popup').show();
  $('#location-input').focus();
});

$('#cancel').on('click', () => $('#change-location-popup').hide());

const getForecast = () => {
  const location = $('#location-input').val();

  fetch(`https://sweater-weather-ky.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(forecast => displayForecast(forecast))
    .catch(error => console.error({ error }));

  $('#change-location-popup').hide();
  $('#city-state').text(location);
};

const displayForecast = (forecast) => {
  $('#location-input').val('');
  setLocationNowSection(forecast.data.attributes.current_weather.data.attributes);
  // setDetailsSection();
  // setHourlySection();
  // setDailySection();
};

const setLocationNowSection = (daily_attributes) => {
  console.log(daily_attributes);
};






$('#location-set-button').on('click', getForecast);
