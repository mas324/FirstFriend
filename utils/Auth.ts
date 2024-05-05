import { deleteItem, setItem } from "./LocalStore";
import { User } from '../components/Types';
import { signOut } from './Firestore';

export const useAuth = () => {
    const login = (user: User, fbUser: any) => {
        setItem('@user', user);
        setItem('@fireUser', fbUser);
    }

    const logout = () => {
        deleteItem('@user');
        deleteItem('@fireUser');
        signOut();
    }

    return { login, logout };
}
