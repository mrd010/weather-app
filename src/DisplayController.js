import {
  createElement,
  createMaterialIcon,
  createWeatherIcon,
  createElementWithClasses,
  createContainer,
} from './ElementCreator';
import { createHeader, createMain, createFooter } from './WeatherAppTemplate';
import { format } from 'date-fns';
import Weather from './Weather';

const defaultUnit = 'metric';
const defaultLocationName = 'Mashhad';

const initLoad = function initialLoadingOfAppLayout() {
  const wrapper = createContainer('wrapper');
  // create header
  const header = createHeader();
  wrapper.appendChild(header);
  document.body.appendChild(wrapper);
  // set default settings
  document.getElementById(`radio-${defaultUnit}`).setAttribute('checked', true);
  // set time
  const currentTime = Date.now();
  header.querySelector('#current-local-time .header-time-time').textContent = format(
    currentTime,
    'PPP , pp'
  );
  header.querySelector('#current-local-time .header-time-zone').textContent = `${format(
    currentTime,
    'OOOO'
  )} (${new Date(currentTime).toString().split('(')[1]}`;

  (async () => {
    const r = await Weather.getWeatherOf(defaultLocationName, defaultUnit);
    if (!r.ok) {
      console.log(r.errorMessage);
    }
  })();
};

export default initLoad;
