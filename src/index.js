import './css/normalize.css';
import 'material-symbols/rounded.css';
import './css/weather-icons.min.css';
import './scss/style.scss';

import initLoad from './DisplayController';

const weatherAppId = 'ab9e89850b5939e16de7d8b2e3f4c6a9';

const testWeather = async function testWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=mashhad&appid=${weatherAppId}`
  );

  const r = await response.json();

  console.log(r);

  const response3 = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${r[0].lat}&lon=${r[0].lon}&appid=${weatherAppId}&units=metric`
  );

  const r3 = await response3.json();

  console.log(r3);

  const response2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${r[0].lat}&lon=${r[0].lon}&appid=${weatherAppId}&units=metric`
  );

  //   console.log(response2);

  const r2 = await response2.json();

  console.log(r2);
};

// testWeather();
const initialize = function initializeFirstLoad() {
  initLoad();
};

initialize();
