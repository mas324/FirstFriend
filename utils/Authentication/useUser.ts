import { useContext } from "react";
import { useLocalStore } from "./useLocalStorage";
import { AuthContext } from "./AuthContext";

export interface User {
    username: string;
    authToken?: string;
}

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { storeItem, deleteItem } = useLocalStore();

    const addUser = (user: User) => {
        setUser(user);
        storeItem(JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        deleteItem();
    };

    return { user, addUser, removeUser, setUser };
}
