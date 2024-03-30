import { createContext } from "react";
import { User } from "./useUser";

// Auth context to be used thoughout the app
interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});
