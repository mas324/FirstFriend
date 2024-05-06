import axios from 'axios';

const METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=33.8314&longitude=-118.282&current=temperature_2m,relative_humidity_2m,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FLos_Angeles'

const weatherCall = async () => {

    console.log('WeatherAPI: recieved call to update');

    const response = (await axios.get(METEO_URL)).data;
    //const response = require('../../assets/forecast.json');
    //console.log("responses first:", response);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utc_offset_seconds;
    const timezone = response.timezone;
    const timezoneAbbreviation = response.timezone_abbreviation;
    const latitude = response.latitude;
    const longitude = response.longitude;

    const current = response.current;
    const hourly = response.hourly;
    const daily = response.daily;

    // Helper function to form time ranges
    function timeArray(data: Array<number>) {
        const outDate = Array<Date>();
        data.forEach(element => {
            outDate.push(new Date(element * 1000));
        });
        return outDate;
    }

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date(current.time * 1000).getTime(),
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            precipitation: current.precipitation,
            clouds: current.cloud_cover,
            windSpeed: current.wind_speed_10m,
            windFrom: current.wind_direction_10m,
        },
        daily: {
            time: timeArray(daily.time),
            temperatureMax: daily.temperature_2m_max,
            temperatureMin: daily.temperature_2m_min,
            rainProbability: daily.precipitation_probability_max,
            windMax: daily.wind_speed_10m_max,
            windFrom: daily.wind_direction_10m_dominant,
        },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    const dailyArray = Array();
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        dailyArray.push({
            time: weatherData.daily.time[i].getTime(),
            tempMin: weatherData.daily.temperatureMin[i],
            tempMax: weatherData.daily.temperatureMax[i],
            rain: weatherData.daily.rainProbability[i],
            wind: weatherData.daily.windMax[i],
            windFrom: weatherData.daily.windFrom[i]
        })
    }
    //console.log("weather daily as property", weatherData.daily);
    //console.log("weather as array", dailyArray);
    return { current: weatherData.current, daily: dailyArray }
}

export default weatherCall;
