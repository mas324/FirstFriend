import { createContext } from "react";
import { User } from "../components/Types";

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

type Job = {
    position: string,
    recruiter: string,
    description: string,
    salary: string,
}

type AppState = {
    user: User,
    setUser: (newUser: User) => void,
    weather: Weather,
    setWeather: (newWeather: Weather) => void,
    jobs: Job[],
    setJobs: (newJobs: Job) => void,
}

const AppContext = createContext<AppState>({
    user: null,
    setUser: () => { },
    weather: null,
    setWeather: () => { },
    jobs: null,
    setJobs: () => { },
});

export default AppContext;
