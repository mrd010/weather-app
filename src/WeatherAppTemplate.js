import { format } from 'date-fns';
import Weather from './Weather';

import {
  createElement,
  createMaterialIcon,
  appendChildren,
  createWeatherIcon,
  createElementWithClasses,
  createContainer,
} from './ElementCreator';

const materialIconStyle = 'rounded';

// Create Header Logo #######################################
const createHeaderLogo = function createHeaderLogo() {
  const headerLogo = createElement('div', 'header-logo');
  const link = createElement('a', undefined, ['href', '#']);
  const headerLogoText = createElement('h1', 'header-logo-text');
  headerLogoText.classList.add('shadowed');
  headerLogoText.classList.add('no-wrap');
  headerLogoText.textContent = 'MoreWeather';
  link.appendChild(headerLogoText);
  headerLogo.appendChild(link);

  return headerLogo;
};

// Create Header Search #######################################
const createHeaderSearch = function createHeaderSearch() {
  const headerSearch = createElement('div', 'header-search');
  const form = createElement('form', undefined, ['action', '#']);
  const searchInput = createElement(
    'input',
    'no-wrap',
    ['type', 'search'],
    ['id', 'search-city'],
    ['name', 'search-city'],
    ['placeholder', 'Get Weather In Your City'],
    ['required', true],
    ['min-length', '3'],
    ['max-length', '30']
  );
  const submitBtn = createElement('button', undefined, ['type', 'submit']);
  const icon = createMaterialIcon(materialIconStyle, 'button-icon', 'search');
  submitBtn.appendChild(icon);
  appendChildren(form, [searchInput, submitBtn]);
  headerSearch.appendChild(form);

  return headerSearch;
};

// Create Header Settings #######################################
const createHeaderSettings = function createHeaderSettings() {
  const headerSettings = createContainer('header-settings');
  const headerSettingsToggle = createElement('div', 'header-settings-toggle', [
    'id',
    'units-toggle',
  ]);
  const headerSettingsLabel = createElement('h5', 'header-settings-label');
  headerSettingsLabel.textContent = 'Units:';
  const radioMetric = createElement(
    'input',
    undefined,
    ['type', 'radio'],
    ['name', 'units'],
    ['id', 'radio-metric'],
    ['value', 'metric']
  );
  const radioMetricLabel = createElementWithClasses('label', 'button-label no-wrap', [
    'for',
    'radio-metric',
  ]);
  radioMetricLabel.textContent = 'Metric';
  const radioImperial = createElement(
    'input',
    undefined,
    ['type', 'radio'],
    ['name', 'units'],
    ['id', 'radio-imperial'],
    ['value', 'imperial']
  );
  const radioImperialLabel = createElementWithClasses('label', 'button-label no-wrap', [
    'for',
    'radio-imperial',
  ]);
  radioImperialLabel.textContent = 'Imperial';

  appendChildren(headerSettingsToggle, [
    headerSettingsLabel,
    radioMetric,
    radioMetricLabel,
    radioImperial,
    radioImperialLabel,
  ]);
  headerSettings.appendChild(headerSettingsToggle);

  return headerSettings;
};

// Create Header Time #######################################
const createHeaderTime = function createHeaderTime() {
  const headerTime = createElement('div', 'header-time', ['id', 'current-local-time']);

  const headerTimeTime = createElementWithClasses('p', 'header-time-time no-wrap');
  headerTimeTime.textContent = '';
  const headerTimeZone = createElementWithClasses('p', 'header-time-zone no-wrap');
  headerTimeZone.textContent = '';
  appendChildren(headerTime, [headerTimeTime, headerTimeZone]);

  return headerTime;
};

// Create Header #######################################
export const createHeader = function createHeader() {
  const header = createElement('header', 'header');
  appendChildren(header, [
    createHeaderLogo(),
    createHeaderSearch(),
    createHeaderSettings(),
    createHeaderTime(),
  ]);

  return header;
};
// create Info detail #######################################
const createInfoDetail = function createWeatherInfoDetailSection(
  id,
  key,
  unit = null,
  icon = null
) {
  const infoDetail = createElement('div', 'info-detail', ['id', id]);
  if (icon) {
    infoDetail.appendChild(icon);
  }
  const elm = createElement('span', 'key');
  elm.classList.add('no-wrap');
  elm.textContent = key;
  infoDetail.appendChild(elm);

  const v = createElement('span', 'value');
  v.textContent = '';
  infoDetail.appendChild(v);

  if (unit) {
    if (unit.icon) {
      infoDetail.appendChild(unit.icon);
    } else {
      const u = createElement('span', 'unit');
      u.innerHTML = unit.content;
      infoDetail.appendChild(u);
    }
  }

  return infoDetail;
};

// Create Location Part #######################################
const createLocationPart = function createLocationPart() {
  const locationInfo = createElement('div', 'section-part', ['id', 'location-info']);
  //   create section header
  const sectionHeader = createContainer('section-header');
  const headerIcon = createContainer('header-icon');
  headerIcon.appendChild(createMaterialIcon(materialIconStyle, 'icon', 'location_city'));
  const headerTitle = createElementWithClasses('h2', 'header-title no-wrap name');
  const headerSub = createContainer('header-sub');
  appendChildren(headerSub, [
    createElementWithClasses('span', 'country no-wrap'),
    createElementWithClasses('span', 'state no-wrap'),
  ]);
  appendChildren(sectionHeader, [headerIcon, headerTitle, headerSub]);

  //   create info detail
  const coordinates = createContainer('info-detail');
  const coordinatesIcon = createContainer('icon');
  coordinatesIcon.appendChild(createMaterialIcon(materialIconStyle, 'icon', 'location_on'));
  appendChildren(coordinates, [
    coordinatesIcon,
    createInfoDetail('latitude-info', 'Lat'),
    createInfoDetail('longitude-info', 'Lon'),
  ]);
  appendChildren(locationInfo, [sectionHeader, coordinates]);

  return locationInfo;
};
// Create Weather Part #######################################
const createWeatherPart = function createWeatherPart() {
  const weatherInfo = createElement('div', 'section-part', ['id', 'weather-info']);
  // create weather icon
  const icon = createElementWithClasses('div', 'icon-wrapper info-icon');
  icon.appendChild(createElement('i'));

  const weatherType = createElementWithClasses('div', 'info-detail weather-type');
  weatherType.appendChild(createElementWithClasses('h3', 'value no-wrap'));
  const weatherTypeDesc = createElementWithClasses('div', 'info-detail weather-type-desc');
  weatherTypeDesc.appendChild(createElementWithClasses('span', 'value no-wrap'));

  appendChildren(weatherInfo, [icon, weatherType, weatherTypeDesc]);

  return weatherInfo;
};
// Create General Info Section #######################################
const createGeneralInfo = function createGeneralInfoSection() {
  const generalInfo = createElement('div', 'container-header', ['id', 'general-info']);
  appendChildren(generalInfo, [createLocationPart(), createWeatherPart()]);

  return generalInfo;
};
// Create Last Updated Section #######################################
const createLastUpdated = function createLastUpdatedSection() {
  const lastUpdated = createElement('div', 'info-section', ['id', 'last-updated-info']);
  // create section header
  const sectionHeader = createContainer('section-header');
  const headerTitle = createElementWithClasses('h3', 'header-title no-wrap');
  headerTitle.textContent = 'Last Updated';
  const headerSub = createContainer('header-sub');
  const formattedTime = createElementWithClasses('span', 'formatted-time no-wrap');
  formattedTime.textContent = '';
  headerSub.appendChild(formattedTime);
  appendChildren(sectionHeader, [headerTitle, headerSub]);
  lastUpdated.appendChild(sectionHeader);
  // create action button
  const actionButton = createElement('button', 'action-button', ['id', 'refresh-info']);
  actionButton.appendChild(createMaterialIcon(materialIconStyle, 'icon', 'update'));
  lastUpdated.appendChild(actionButton);

  return lastUpdated;
};

// Create Temperature Info Section #######################################
const createTemperatureInfo = function createTemperatureInfoSection() {
  const tempInfo = createElement('div', 'info-section', ['id', 'temperature-info']);

  // create section header
  const sectionHeader = createContainer('section-header');
  const headerIcon = createContainer('header-icon');
  headerIcon.appendChild(createWeatherIcon('thermometer'));
  const headerTitle = createElement('h3', 'header-title');
  headerTitle.textContent = 'Temperature';
  appendChildren(sectionHeader, [headerIcon, headerTitle]);
  tempInfo.appendChild(sectionHeader);

  // create info detail - current temp
  tempInfo.appendChild(
    createInfoDetail('current-temp', '', {
      icon: createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon'),
    })
  );
  // create info detail - feels like temp
  tempInfo.appendChild(
    createInfoDetail(
      'feels-like-temp',
      'Feels Like',
      {
        icon: createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon'),
      },
      createMaterialIcon(materialIconStyle, 'icon', 'sentiment_satisfied')
    )
  );
  // create info detail - min temp
  tempInfo.appendChild(
    createInfoDetail(
      'min-temp',
      'Min Temperature',
      {
        icon: createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon'),
      },
      createWeatherIcon('thermometer-internal', 'icon')
    )
  );
  // create info detail - max temp
  tempInfo.appendChild(
    createInfoDetail(
      'max-temp',
      'Max Temperature',
      {
        icon: createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon'),
      },
      createWeatherIcon('thermometer-internal', 'icon')
    )
  );

  return tempInfo;
};
// Create Wind Info #######################################
const createWindInfo = function createWindInfoSection() {
  const windInfo = createElement('div', 'info-section', ['id', 'wind-info']);

  // create section header
  const sectionHeader = createContainer('section-header');
  const headerIcon = createContainer('header-icon');
  headerIcon.appendChild(createMaterialIcon(materialIconStyle, undefined, 'air'));
  const headerTitle = createElement('h3', 'header-title');
  headerTitle.textContent = 'Wind';
  appendChildren(sectionHeader, [headerIcon, headerTitle]);
  windInfo.appendChild(sectionHeader);

  // create info detail - wind direction
  windInfo.appendChild(
    createInfoDetail(
      'wind-dir',
      'Wind Direction',
      { icon: createWeatherIcon('degrees', 'unit-icon') },
      createWeatherIcon('wind-direction', 'icon')
    )
  );
  // create info detail - wind speed
  windInfo.appendChild(
    createInfoDetail(
      'wind-speed',
      'Wind Speed',
      { content: Weather.getUnits().speedUnit },
      createMaterialIcon(materialIconStyle, 'icon', 'speed')
    )
  );

  return windInfo;
};
// Create Other Info #######################################
const createOtherInfo = function createOtherInfoSection() {
  const otherInfo = createElement('div', 'info-section', ['id', 'other-info']);

  // create info detail - pressure
  otherInfo.appendChild(
    createInfoDetail(
      'pressure',
      'Pressure',
      { content: 'hPa' },
      createWeatherIcon('barometer', 'icon')
    )
  );
  // create info detail - humidity
  otherInfo.appendChild(
    createInfoDetail(
      'humidity',
      'Humidity',
      { content: '%' },
      createWeatherIcon('humidity', 'icon')
    )
  );
  // create info detail - visibility
  otherInfo.appendChild(
    createInfoDetail(
      'visibility',
      'Visibility',
      { content: 'm' },
      createMaterialIcon(materialIconStyle, 'icon', 'visibility')
    )
  );
  // create info detail - cloudiness
  otherInfo.appendChild(
    createInfoDetail(
      'cloudiness',
      'Cloudiness',
      { content: '%' },
      createWeatherIcon('cloud', 'icon')
    )
  );

  return otherInfo;
};
// Create Current Weather #######################################
const createCurrentWeather = function createCurrentWeatherContainer() {
  const currentWeather = createElement('section', 'main-container', ['id', 'current-weather']);
  appendChildren(currentWeather, [
    createGeneralInfo(),
    createLastUpdated(),
    createTemperatureInfo(),
    createWindInfo(),
    createOtherInfo(),
  ]);

  return currentWeather;
};

// Create Header #######################################
const createForecastWeather = function createForecastWeatherContainer() {
  const forecastWeather = createElement('section', 'side-container', ['id', 'forecast-weather']);

  // create container header
  const containerHeader = createContainer('container-header');
  const headerTitle = createElement('h3', 'header-title');
  headerTitle.textContent = 'Future Days';
  containerHeader.appendChild(headerTitle);
  forecastWeather.appendChild(containerHeader);

  // create cards container
  const cardsContainer = createElement('div', 'container-main', ['id', 'forecast-cards-container']);
  forecastWeather.appendChild(cardsContainer);

  return forecastWeather;
};

// Create Main #######################################
export const createMain = function createMain() {
  const main = createElement('main');
  main.appendChild(createCurrentWeather());
  main.appendChild(createForecastWeather());

  return main;
};

//  Create Footer #######################################
export const createFooter = function createFooter() {
  const footer = createElement('footer');
  const footerContent = createElement('p', 'no-wrap');
  footerContent.textContent = 'Powered by';
  const refLink = createElement(
    'a',
    'no-decoration',
    ['href', 'https://openweathermap.org'],
    ['target', '_blank']
  );
  refLink.textContent = 'OpenWeather';
  footerContent.appendChild(refLink);
  footer.appendChild(footerContent);

  return footer;
};

// create forecast cards
export const createForecastCard = function createForecastCardFromData(forecastedData) {
  const phaseOfDay = { d: 'day', n: 'night' };

  const card = createContainer('side-card');

  // date
  const date = createElementWithClasses('span', 'date no-wrap');
  date.textContent = format(forecastedData.dt * 1000, 'PPPP');
  // time
  const time = createElementWithClasses('span', 'time no-wrap');
  time.textContent = format(forecastedData.dt * 1000, 'p');
  // weather main
  const weather = createContainer('weather');

  weather.appendChild(
    createWeatherIcon(
      `owm-${phaseOfDay[forecastedData.sys.pod]}-${forecastedData.weather[0].id}`,
      'icon'
    )
  );
  const weatherType = createElementWithClasses('span', 'weather-type no-wrap');
  weatherType.textContent = forecastedData.weather[0].main;
  weather.appendChild(weatherType);
  // temperature
  const temp = createContainer('temp');
  const avgTemp = createContainer('avg-temp');
  let span = createElement('span', 'value');
  span.textContent = Math.round(forecastedData.main.temp);
  span.setAttribute('data-real-value', `${forecastedData.main.temp}`);
  appendChildren(avgTemp, [span, createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon')]);

  const minTemp = createContainer('min-temp');
  span = createElement('span', 'value');
  span.textContent = Math.round(forecastedData.main.temp_min);
  span.setAttribute('data-real-value', `${forecastedData.main.temp_min}`);
  appendChildren(minTemp, [span, createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon')]);

  const maxTemp = createContainer('max-temp');
  span = createElement('span', 'value');
  span.textContent = Math.round(forecastedData.main.temp_max);
  span.setAttribute('data-real-value', `${forecastedData.main.temp_max}`);
  appendChildren(maxTemp, [span, createWeatherIcon(Weather.getUnits().tempUnit, 'unit-icon')]);
  appendChildren(temp, [avgTemp, minTemp, maxTemp]);

  appendChildren(card, [date, time, weather, temp]);

  return card;
};
