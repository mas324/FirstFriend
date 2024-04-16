import * as Crypto from 'expo-crypto';
import { deleteItem, setItem } from "./LocalStore";

// Function to hash any data that is needed, mainly passwords
export async function getHash(toHash: string) {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        toHash
    );
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