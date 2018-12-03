/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	$('#change-location-popup').hide();

	$('#change-location-button').on('click', function () {
	  $('#change-location-popup').show();
	  $('#location-input').focus();
	});

	$('#cancel').on('click', function () {
	  return $('#change-location-popup').hide();
	});

	var getForecast = function getForecast() {
	  var location = $('#location-input').val() ? $('#location-input').val() : "Denver, CO";
	  localStorage.setItem('location', location);
	  getImage();

	  fetch('https://sweater-weather-ky.herokuapp.com/api/v1/forecast?location=' + location).then(function (response) {
	    return response.json();
	  }).then(function (forecast) {
	    return displayForecast(forecast);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });

	  $('#change-location-popup').hide();
	  $('#city-state').text(location);
	};

	var getImage = function getImage() {
	  var imageLocation = localStorage.getItem('location');

	  fetch('https://sweater-weather-ky.herokuapp.com/api/v1/background?location=' + imageLocation).then(function (response) {
	    return response.json();
	  }).then(function (imageData) {
	    return setImage(imageData);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var setImage = function setImage(imageData) {
	  var imagePath = imageData.data.attributes.location_image;
	  $('body').css('background-image', 'url(' + imagePath + ')');
	};

	var displayForecast = function displayForecast(forecast) {
	  $('#location-input').val('');
	  var forecastData = forecast.data.attributes;
	  setLocationNowSection(forecastData);
	  // setDetailsSection();
	  setHourlySection(forecastData.hourly_temps.data);
	  // setDailySection();
	};

	var setLocationNowSection = function setLocationNowSection(daily_attributes) {
	  setTimeDate(daily_attributes.current_weather.data.attributes.time);
	  setNowForecast(daily_attributes);
	};

	var setNowForecast = function setNowForecast(attributes) {
	  var dailyData = attributes.current_weather.data.attributes;
	  $('#now-description .text').text(dailyData.summary);
	  $('#location-now-icon').attr('src', 'assets/' + dailyData.icon + '.png');
	  $('#now-temp .text').text(Math.round(dailyData.temperature));
	  $('#now-high-number').text(Math.round(attributes.daily_weather.data[0].attributes.temp_high));
	  $('#now-low-number').text(Math.round(attributes.daily_weather.data[0].attributes.temp_low));
	};

	var setTimeDate = function setTimeDate(unixTime) {
	  var dayTime = moment.unix(unixTime);
	  var formattedDay = dayTime.format("hh:mm a, M/D");
	  $('#time-date').text(formattedDay);
	};

	var setHourlySection = function setHourlySection(hourlyData) {
	  $('#hourly-forecast-section').empty();
	  for (var i = 0; i < 9; i++) {
	    var temp = Math.round(hourlyData[i].attributes.temperature);
	    var time = hourlyData[i].attributes.time;
	    $('#hourly-forecast-section').append('<div><p class=\'time\'>' + time + '</p><p class=\'temp\'>' + temp + '<img src=\'assets/circle-shape-outline.png\', alt=\'degree symbol\' class=\'md-deg-symbol\'></p></div>');
	  };
	};

	getForecast();

	$('#photo-button').on('click', getImage);

	$('#location-set-button').on('click', getForecast);

/***/ })
/******/ ]);