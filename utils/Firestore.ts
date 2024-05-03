import * as Firebase from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth, confirmPasswordReset, AuthErrorCodes, signOut as fireOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../components/Types';
import { getItem } from './LocalStore';

export const FireStatusCodes = {
    SUCCESS: 10,
    EMAIL_INVALID: 21,
    NO_USER: 20,
    NO_DATA: 1,
    LOGIN_INVALID: 32,
    ERROR_BAD: 99,
}

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
auth.onAuthStateChanged(change => {
    console.log('Firestore: auth change:', change == null ? change : 'user is set');
})

export async function signIn(username: string, password: string) {
    try {
        const user = (await signInWithEmailAndPassword(auth, username, password)).user;
        const userDoc = doc(db, 'users', user.uid);
        return { status: FireStatusCodes.SUCCESS, data: await getDoc(userDoc), user: user };
    } catch (error) {
        console.error(error);
        if (error.code === AuthErrorCodes.USER_DELETED) {
            return { status: FireStatusCodes.NO_USER };
        } else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            return { status: FireStatusCodes.LOGIN_INVALID };
        } else {
            return { status: FireStatusCodes.ERROR_BAD }
        }
    }
}

export async function signOut() {
    fireOut(auth);
}

export async function reAuth() {
    const user = auth.currentUser;
    if (user == undefined || user == null) {
        const newUser = await getItem('@fireUser');
        console.log('Firestore: retrieved and setting past user');
        auth.updateCurrentUser(newUser);
    } else {
        user.getIdToken(true);
    }
}

export async function signUp(newUser: User, password: string) {
    try {
        const user = (await createUserWithEmailAndPassword(auth, newUser.email, password)).user;
        await setDoc(doc(db, "users", user.uid), newUser);
        console.log("User ID:", user.uid);
        console.log("Document written");
        return { status: FireStatusCodes.SUCCESS, data: user };
    } catch (error) {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
            return { status: FireStatusCodes.EMAIL_INVALID };
        } else {
            console.log("Firestore: returning unknown error:", error.code);
            return { status: FireStatusCodes.ERROR_BAD };
        }
    }
}

export async function sendPasswordReset(email: string) {
    const actionCodeSettings = {
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.firstfriend.ios'
        },
        android: {
            packageName: 'com.firstfriend.android',
            installApp: true,
            minimumVersion: '1'
        }
    }
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
        await setDoc(doc(db, "jobs", postID), jobDetail);
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
