import * as Crypto from 'expo-crypto';
import { deleteItem, setItem } from "./LocalStore";
import { User } from '../components/Types';
import { signOut } from './Firestore';

// Function to hash any data that is needed, mainly passwords
export async function getHash(toHash: string) {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        toHash
    );
    return (digest);
}

export const useAuth = () => {
    const login = (user: User, fbUser: any) => {
        setItem('@user', user);
        setItem('@fireUser', fbUser);
    }

    const logout = () => {
        deleteItem('@user');
        deleteItem('@fireUser');
        deleteItem('@messages');
        deleteItem('@jobs');
        signOut();
    }

    return { login, logout };
}
