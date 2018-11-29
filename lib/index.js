// This file is in the entry point in your webpack config.
console.log("Hey!");

$('#change-location-popup').hide();

$('#change-location-button').on('click', () =>
  $('#change-location-popup').show()
);

$('#cancel').on('click', () =>
  $('#change-location-popup').hide()
);
