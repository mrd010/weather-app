import { format, isAfter, isBefore, formatDistanceToNow } from 'date-fns';
import {
  createElement,
  createWeatherIcon,
  createContainer,
  createElementWithClasses,
} from './ElementCreator';
import { createHeader, createMain, createFooter, createForecastCard } from './WeatherAppTemplate';

import Weather from './Weather';
import countryListAlpha2 from './variousCountryListFormats';

// const and vars ###############################################
let isLoading;
let firstLoad;

// time of day (day,night) ###############################################
const getPhaseOfDay = function timeOfDayDayOrNight(currentTime, sunrise, sunset) {
  if (isAfter(currentTime, sunrise) && isBefore(currentTime, sunset)) {
    return 'day';
  }
  return 'night';
};

// show weather info on main ###############################################
const showWeatherInfo = function showWeatherInfoOnMainContainer(
  locationData,
  currentWeatherData,
  forecastWeatherData
) {
  // define containers
  const generalInfoSection = document.getElementById('general-info');
  const lastUpdatedInfoSection = document.getElementById('last-updated-info');
  const temperatureInfoSection = document.getElementById('temperature-info');
  const windInfoSection = document.getElementById('wind-info');
  const otherInfoSection = document.getElementById('other-info');
  const forecastCardsSection = document.getElementById('forecast-cards-container');
  // set current weather infos

  // location info
  generalInfoSection.querySelector('#location-info .name').textContent = locationData.name;
  const countryName = countryListAlpha2[locationData.country].split('(')[0];
  generalInfoSection.querySelector('#location-info .country').textContent =
    countryName !== undefined ? countryName : locationData.country;
  generalInfoSection.querySelector('#location-info .state').textContent = locationData.state;
  generalInfoSection.querySelector('#location-info .state').style.visibility = locationData.state
    ? 'visible'
    : 'hidden';
  generalInfoSection.querySelector('#latitude-info .value').textContent =
    locationData.lat.toFixed(2);
  generalInfoSection.querySelector('#longitude-info .value').textContent =
    locationData.lon.toFixed(2);
  // general weather info
  const timeOfDay = getPhaseOfDay(
    currentWeatherData.dt * 1000,
    currentWeatherData.sys.sunrise * 1000,
    currentWeatherData.sys.sunset * 1000
  );

  document.getElementById('bg-day').style.opacity = timeOfDay === 'day' ? '1' : '0';
  document.getElementById('bg-night').style.opacity = timeOfDay === 'night' ? '1' : '0';

  generalInfoSection
    .querySelector('#weather-info .info-icon i')
    .replaceWith(createWeatherIcon(`owm-${timeOfDay}-${currentWeatherData.weather[0].id}`, 'icon'));
  generalInfoSection.querySelector('#weather-info .weather-type .value').textContent =
    currentWeatherData.weather[0].main;
  generalInfoSection.querySelector('#weather-info .weather-type-desc .value').textContent =
    currentWeatherData.weather[0].description;

  // temperature info
  // current temp
  const currentTempValue = temperatureInfoSection.querySelector('#current-temp .value');
  currentTempValue.textContent = Math.round(currentWeatherData.main.temp);
  currentTempValue.setAttribute('data-real-value', `${currentWeatherData.main.temp}`);

  // feels like temp
  const feelsLikeTempValue = temperatureInfoSection.querySelector('#feels-like-temp .value');
  feelsLikeTempValue.textContent = Math.round(currentWeatherData.main.feels_like);
  feelsLikeTempValue.setAttribute('data-real-value', `${currentWeatherData.main.feels_like}`);

  // min temp
  const minTempValue = temperatureInfoSection.querySelector('#min-temp .value');
  minTempValue.textContent = Math.round(currentWeatherData.main.temp_min);
  minTempValue.setAttribute('data-real-value', `${currentWeatherData.main.temp_min}`);

  // max temp
  const maxTempValue = temperatureInfoSection.querySelector('#max-temp .value');
  maxTempValue.textContent = Math.round(currentWeatherData.main.temp_max);
  maxTempValue.setAttribute('data-real-value', `${currentWeatherData.main.temp_max}`);

  // wind info
  windInfoSection.querySelector('#wind-dir .value').textContent = currentWeatherData.wind.deg;
  windInfoSection.querySelector('#wind-speed .value').textContent = currentWeatherData.wind.speed;
  windInfoSection
    .querySelector('#wind-speed .value')
    .setAttribute('data-real-value', `${currentWeatherData.wind.speed}`);

  // other info
  otherInfoSection.querySelector('#pressure .value').textContent = currentWeatherData.main.pressure;
  otherInfoSection.querySelector('#humidity .value').textContent = currentWeatherData.main.humidity;
  otherInfoSection.querySelector('#visibility .value').textContent = currentWeatherData.visibility;
  otherInfoSection.querySelector('#cloudiness .value').textContent = currentWeatherData.clouds.all;

  // forecast future cards
  forecastCardsSection.replaceChildren();
  forecastWeatherData.list.forEach((forecastedData) => {
    forecastCardsSection.appendChild(createForecastCard(forecastedData));
  });

  // set last updated
  lastUpdatedInfoSection.querySelector('.formatted-time').textContent = formatDistanceToNow(
    Weather.getLastTimeUpdated(),
    { addSuffix: true }
  );
};

// disable input while loading #######################################################
const disableInputs = function disableSearchAndRadioButtons() {
  document.getElementById('search-city').setAttribute('disabled', true);
  document.getElementById('radio-metric').setAttribute('disabled', true);
  document.getElementById('radio-imperial').setAttribute('disabled', true);
  document.getElementById('refresh-info').setAttribute('disabled', true);
};
// enable input while loading finishes #######################################################
const enableInputs = function enableSearchAndRadioButtons() {
  document.getElementById('search-city').removeAttribute('disabled');
  document.getElementById('radio-metric').removeAttribute('disabled');
  document.getElementById('radio-imperial').removeAttribute('disabled');
  document.getElementById('refresh-info').removeAttribute('disabled');
};

// show loading overlay when there is no other loading shown ###############################################
const showLoading = function showLoadings() {
  if (!isLoading) {
    isLoading = true;
    const loadingContainer = createContainer('loading');
    const loadingText = createElement('span', 'loading-text');
    loadingText.textContent = 'Get Data';
    loadingContainer.appendChild(loadingText);
    loadingContainer.appendChild(createContainer('custom-loader'));
    // show loading
    document.querySelector('.header').appendChild(loadingContainer);
    disableInputs();
    return loadingContainer;
  }
  return null;
};

// show error ###############################################
const showError = function showErrorOnLoadingContainer(errorMessage) {
  // check if there is already an error showing and remove it
  const trash = document.querySelector('error-container');
  if (trash) {
    trash.remove();
  }
  // create new error container and show it
  const errorContainer = createContainer('error-container');
  const alertError = createElement('p', 'alert-error');
  alertError.textContent = errorMessage;
  errorContainer.appendChild(alertError);
  document.querySelector('.wrapper').appendChild(errorContainer);

  // self destruct error overlay after a time
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
};

// get city name and fetch it from weather module ###############################################
const getWeatherInfo = async function getWeatherInfo() {
  // show loading overlay until data loads
  const loadingSession = showLoading();
  // begin getting data
  const weatherData = await Weather.getLocationWeather();
  // end of getting data

  // hide current loading overlay
  if (loadingSession) {
    loadingSession.remove();
    isLoading = false;
    enableInputs();
  }

  // check if data received is correct and if not show error for each code returned
  if (!weatherData.ok) {
    let errorMessage = '';
    const errorCode = weatherData.errorMessage.split(' ')[0];
    switch (errorCode) {
      case '400':
        errorMessage = 'There is some problem in request from server';
        break;
      case '401':
        errorMessage = `Unauthorized Access! Can't recognize provided API key`;
        break;
      case '404':
        errorMessage = `Sorry! it seems your requested info doesn't match our database`;
        break;
      case '429':
        errorMessage = 'Too Many Requests for provided API key';
        break;
      case '1000':
        errorMessage = `Sorry! Couldn't find a city with this name`;
        break;
      case '1001':
        errorMessage = `Timeout`;
        break;

      default:
        break;
    }
    showError(errorMessage);
    return false;
  }

  // if its first time loading a weather move header box to top
  if (firstLoad) {
    firstLoad = false;

    document.querySelector('.wrapper').classList.remove('first-load');
    setTimeout(() => {
      document.querySelector('main').style.opacity = '1';
    }, 1);
  }
  document.getElementById('search-city').value = '';

  showWeatherInfo(
    weatherData.locationInfo[0],
    weatherData.weatherInfo.currentWeatherData,
    weatherData.weatherInfo.forecastData
  );
  return true;
};

// change units and unit icons when setting changed #######################################################
const changeUnitsDisplay = function changeUnitsDisplay() {
  if (this.checked) {
    // set new units
    Weather.setUnits(this.value);
    // change display
    const tempIcons = document.querySelectorAll(
      '#temperature-info .unit-icon,#forecast-cards-container .temp .unit-icon'
    );
    const speedIcon = document.querySelector('#wind-speed .unit');

    // change unit icons
    tempIcons.forEach((tempIcon) => {
      tempIcon.replaceWith(createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon'));
    });
    speedIcon.innerHTML = Weather.getUnits().speedUnit;
    // change values (celsius to F or vise versa)
    if (!firstLoad) {
      // conversion formulas
      const formulas = {
        to_metricTemp: (f) => ((f - 32) * 5) / 9,
        to_imperialTemp: (c) => (c * 9) / 5 + 32,
        to_metricSpeed: (ms) => ms * 2.236936,
        to_imperialSpeed: (mh) => mh * 0.44704,
      };

      // convert temp values
      const tempValues = document.querySelectorAll(
        '#temperature-info .value,#forecast-cards-container .temp .value'
      );
      tempValues.forEach((tempValue) => {
        const realValue = Number(tempValue.getAttribute('data-real-value'));
        let newValue;
        tempValue.textContent = Math.round(
          (newValue = formulas[`to_${Weather.getUnits().units}Temp`](realValue))
        );
        tempValue.setAttribute('data-real-value', newValue);
      });
      // convert speed values
      const windSpeedValue = document.querySelector('#wind-speed .value');
      const speedRealValue = Number(windSpeedValue.getAttribute('data-real-value'));
      const newValue = formulas[`to_${Weather.getUnits().units}Speed`](speedRealValue);
      windSpeedValue.textContent = newValue.toFixed(2);

      windSpeedValue.setAttribute('data-real-value', newValue);
    }
  }
};

// initial set app #######################################################
const initLoad = function initialLoadingOfAppLayout() {
  isLoading = false;
  firstLoad = true;
  // add bg image containers
  document.body.appendChild(createElement('div', 'bg-container', ['id', 'bg-day']));
  document.body.appendChild(createElement('div', 'bg-container', ['id', 'bg-night']));

  const wrapper = createElementWithClasses('div', 'wrapper first-load');
  // set background

  // create header
  const header = createHeader();
  wrapper.appendChild(header);
  document.body.appendChild(wrapper);
  // set default settings
  document.getElementById(`radio-${Weather.getUnits().units}`).setAttribute('checked', true);
  document.getElementById('radio-metric').addEventListener('change', changeUnitsDisplay);
  document.getElementById('radio-imperial').addEventListener('change', changeUnitsDisplay);
  // set time
  const headerTime = header.querySelector('#current-local-time .header-time-time');
  const headerTimeZone = header.querySelector('#current-local-time .header-time-zone');
  // auto update time in header
  setInterval(() => {
    const currentTime = Date.now();
    headerTime.textContent = format(currentTime, 'PPP , p');
    headerTimeZone.textContent = `${format(currentTime, 'OOOO')} (${
      new Date(currentTime).toString().split('(')[1]
    }`;
  }, 1000);

  // create and show main/footer section
  const main = createMain();
  main.style.opacity = '0';
  wrapper.appendChild(main);
  wrapper.appendChild(createFooter());

  // set search input
  const search = header.querySelector('.header-search');
  search.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isLoading) {
      const searchInput = search.querySelector('#search-city');
      Weather.setLocation(searchInput.value);
      getWeatherInfo();
    }
  });
  // set refresh button
  document.getElementById('refresh-info').addEventListener('click', () => {
    if (!isLoading) {
      getWeatherInfo();
    }
  });

  // auto update last updated time
  setInterval(() => {
    main.querySelector('#last-updated-info .formatted-time').textContent = formatDistanceToNow(
      Weather.getLastTimeUpdated(),
      { addSuffix: true }
    );
  }, 5000);
};

export default initLoad;
