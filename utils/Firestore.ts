import * as Firebase from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth, confirmPasswordReset } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../components/Types';

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyB8pfQFlCHcG0KLvzECCgyRaEPsYFRE2y0",
    authDomain: "auspicious-silo-419506.firebaseapp.com",
    projectId: "auspicious-silo-419506",
    storageBucket: "auspicious-silo-419506.appspot.com",
    messagingSenderId: "776008034560",
    appId: "1:776008034560:web:db9c149a7fffbcce94ebe5",
    measurementId: "G-HRV5MXZS47"
})

const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage)
})
const db = getFirestore();

export async function signIn(username: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
        console.error(error);
    }
}

export async function signUp(newUser: User, password: string) {
    try {
        const user = (await createUserWithEmailAndPassword(auth, newUser.email, password)).user;
        const res = await addDoc(collection(db, "users", user.uid), newUser);
        console.log("User ID:", user.uid);
        console.log("Document written:", res.id);
        return { status: 201, data: user };
    } catch (error) {
        console.error(error);
        if (error === '') {
            return { status: 502 };
        } else {
            return { status: 403 };
        }
    }
}

export async function sendPasswordReset(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error(error);
    }
}

export async function confirmReset(code: string, password: string) {
    try {
        await confirmPasswordReset(auth, code, password)
    } catch (error) {
        console.error(error);
    }
}

export async function postJob(jobDetail: any, postID: string) {
    try {
        await addDoc(collection(db, "jobs", postID), jobDetail);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getJob() {
    try {
        return await getDocs(collection(db, "jobs"));
    } catch (error) {
        console.error(error);
    }
}









