export default class Weather {
  static #weatherAppId = 'ab9e89850b5939e16de7d8b2e3f4c6a9';

  static async getWeatherOf(locationName, units = 'metric') {
    // fetch geo data of city
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&appid=${this.#weatherAppId}`,
        { type: 'cors' }
      );
      console.log(geoResponse);
      if (!geoResponse.ok || geoResponse.status !== 200) {
        throw new Error(`${geoResponse.status} ${geoResponse.statusText}`);
      }
      const geoData = geoResponse.json();

      //   fetch city weather info from geo data
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${this.#weatherAppId}&units=${units}`,
        { type: 'cors' }
      );

      if (!currentWeatherResponse.ok || currentWeatherResponse.status !== 200) {
        throw new Error(`${geoResponse.status} ${geoResponse.statusText}`);
      }
    } catch (error) {
      return { weatherInfo: null, ok: false, errorMessage: error.message };
    }
  }
}
