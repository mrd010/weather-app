import './css/normalize.css';
import 'material-symbols/rounded.css';
import './css/weather-icons.min.css';
import './scss/style.scss';

import initLoad from './DisplayController';
import Weather from './Weather';

const defaultLocationName = 'Mashhad';
const defaultUnitMeasurements = 'metric';
const defaultTimeoutDelay = 15000;

const initialize = function initializeFirstLoad() {
  Weather.setLocation(defaultLocationName);
  Weather.setUnits(defaultUnitMeasurements);
  Weather.setTimeoutDelay(defaultTimeoutDelay);
  initLoad();
};

initialize();
