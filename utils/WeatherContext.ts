import { createContext } from "react";

const WeatherContext = createContext({
    weatherData: {},
    setWeatherData: () => { },
});

export default WeatherContext;
