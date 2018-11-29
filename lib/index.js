$('#location-input').hide();

$('#change-location-button').on('click', () =>
  $('#change-location-popup').show()
);

$('#cancel').on('click', () =>
  $('#change-location-popup').hide()
);

const getForecast = () => {
  const location = $('#location-input').val();

  fetch(`https://sweater-weather-ky.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(forecast => displayForecast(forecast))
    .catch(error => console.error({ error }));

  $('#change-location-popup').hide();
  $('#city-state').text(location);
  $('#location-input').text('');
};

const displayForecast = (forecast) => (console.log(forecast));






$('#location-set-button').on('click', getForecast);
