import { createContext } from "react";

const AppContext = createContext({
    state: {},
    setState: () => { },
    weather: { current: {}, daily: [] },
    setWeather: () => { },
    jobs: {},
    setJobs: () => { },
    message: {},
    setMessage: () => { }
});

export default AppContext;
