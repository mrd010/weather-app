export default class Weather {
  static #weatherAppId = 'ab9e89850b5939e16de7d8b2e3f4c6a9';

  static #lastTimeUpdated = Date.now();

  static #timeoutDelay;

  static #unitOfMeasurement;

  static #LocationName;

  static getLocation() {
    return this.#LocationName;
  }

  static setLocation(location) {
    this.#LocationName = location;
  }

  static getUnits() {
    return this.#unitOfMeasurement === 'metric'
      ? { units: 'metric', tempUnit: 'celsius', speedUnit: '<sup>m</sup>/<sub>s</sub>' }
      : { units: 'imperial', tempUnit: 'fahrenheit', speedUnit: '<sup>miles</sup>/<sub>h</sub>' };
  }

  static setUnits(unit) {
    this.#unitOfMeasurement = unit;
  }

  static setTimeoutDelay(delay) {
    this.#timeoutDelay = delay;
  }

  static getLastTimeUpdated() {
    return this.#lastTimeUpdated;
  }

  static async getLocationWeather() {
    const units = this.#unitOfMeasurement;
    const timeout = function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            reject(new Error('1001'));
          },
          ms,
          'one'
        );
      });
    };
    // fetch geo data of city
    try {
      const geoResponse = await Promise.race([
        fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${this.#LocationName}&appid=${this.#weatherAppId}`,
          { type: 'cors' }
        ),
        timeout(this.#timeoutDelay),
      ]);

      if (!geoResponse.ok || geoResponse.status !== 200) {
        throw new Error(`${geoResponse.status} ${geoResponse.statusText}`);
      }
      const geoData = await geoResponse.json();

      if (!geoData.length) {
        throw new Error(`1000 Sorry! Couldn't find a city with this name`);
      }

      //   fetch city weather info from geo data
      const currentWeatherResponse = await Promise.race([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${this.#weatherAppId}&units=${units}`,
          { type: 'cors' }
        ),
        timeout(this.#timeoutDelay),
      ]);

      if (!currentWeatherResponse.ok || currentWeatherResponse.status !== 200) {
        throw new Error(`${geoResponse.status} ${geoResponse.statusText}`);
      }
      const currentWeatherData = await currentWeatherResponse.json();

      //   fetch city forecast from geo data
      const forecastResponse = await Promise.race([
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${this.#weatherAppId}&units=${units}`,
          { type: 'cors' }
        ),
        timeout(this.#timeoutDelay),
      ]);
      if (!forecastResponse.ok || forecastResponse.status !== 200) {
        throw new Error(`${geoResponse.status} ${geoResponse.statusText}`);
      }
      const forecastData = await forecastResponse.json();
      this.#lastTimeUpdated = Date.now();

      return {
        locationInfo: geoData,
        weatherInfo: { currentWeatherData, forecastData },
        ok: true,
        errorMessage: '',
      };
    } catch (error) {
      return { locationInfo: null, weatherInfo: null, ok: false, errorMessage: error.message };
    }
  }
}
