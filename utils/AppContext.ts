import { createContext } from "react";
import { User } from "../components/Types";

// const AppContext = createContext({
//     state: {},
//     setState: () => { },
// });

type UserState = {
    user: User,
    setUser: (newUser: User) => void
}

const AppContext = createContext<UserState>({
    user: null,
    setUser: () => { },
});

export default AppContext;
