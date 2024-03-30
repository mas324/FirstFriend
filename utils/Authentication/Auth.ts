import { useEffect } from "react";
import * as Crypto from 'expo-crypto';
import { useLocalStore } from "./useLocalStorage";
import { User, useUser } from "./useUser";

// Function to hash any data that is needed, mainly passwords
export async function hasher(toHash: string) {

    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        toHash
    );

    console.log('Recieved: ', toHash);
    console.log('Returning: ', digest);
    return (digest);
}

export const useAuth = () => {
    const { user, addUser, removeUser, setUser } = useUser();
    const { retrieveItem } = useLocalStore();

    useEffect(() => {
        console.log('triggered effect');
        retrieveItem().then((value) => {
            console.log('entered promise effect', value);
            if (value != null) {
                addUser(JSON.parse(value));
            }
        })
    }, [addUser, retrieveItem]);

    const login = (user: User) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, setUser };
}


