import * as Crypto from 'expo-crypto';
import { deleteItem, setItem } from "./LocalStore";
import { useContext } from 'react';
import AppContext from './AppContext';

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
    const login = (user: string) => {
        setItem('@user', user)
    }

    const logout = () => {
        deleteItem('@user');
    }

    return { login, logout };
}
