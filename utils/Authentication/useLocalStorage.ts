import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";

const { setItem, getItem, removeItem } = useAsyncStorage('@user')

export const useLocalStore = () => {
    const [value, setValue] = useState<string | null>(null);

    const storeItem = (value: string) => {
        setItem(value);
        setValue(value)
    }

    const retrieveItem = async () => {
        return getItem();
    }

    const deleteItem = () => {
        removeItem().then(() => setValue(null));
    }

    return { value, storeItem, retrieveItem, deleteItem };
}