import { createContext } from "react";

const AppContext = createContext({
    state: 'unauth',
    setState: () => { },
});

export default AppContext;
