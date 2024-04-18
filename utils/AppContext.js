import { createContext } from "react";

const AppContext = createContext({
    state: {},
    setState: () => { },
});

export default AppContext;
