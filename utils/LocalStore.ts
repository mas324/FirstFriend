import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    country?: string,
    major?: string
}

export function convertToUserJSON(data: User) {
    const out : User = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        country: data.country,
        major: data.major
    };
    return out;
}

export async function getItem(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export async function setItem(key: string, value: Record<string, any> | string | number) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function deleteItem(key: string) {
    return AsyncStorage.removeItem(key);
}
