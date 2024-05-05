import { createContext } from "react";
import { Job, Message, User } from "../components/Types";

type Weather = {
    current: {
        time: number
        temperature: number,
        humidity: number,
        precipitation: number,
        clouds: number,
        windSpeed: number,
        windFrom: number,
    },
    daily: [{
        time: number,
        temperatureMax: number,
        temperatureMin: number,
        rainProbability: number,
        windMax: number,
        windFrom: number,
    }],
}

type AppState = {
    user: User,
    setUser: (newUser: User) => void,
    weather: Weather,
    setWeather: (newWeather: Weather) => void,
    jobs: Job[],
    setJobs: (newJobs: Job[]) => void,
    message: Message[],
    setMessage: (newMessages: Message[]) => void,
}

const AppContext = createContext<AppState>({
    user: null,
    setUser: () => { },
    weather: null,
    setWeather: () => { },
    jobs: null,
    setJobs: () => { },
    message: null,
    setMessage: () => { },
});

export default AppContext;
