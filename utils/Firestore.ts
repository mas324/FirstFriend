import * as Firebase from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth, confirmPasswordReset, AuthErrorCodes, signOut as fireOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job, Message, MessageStore, User } from '../components/Types';
import { getItem } from './LocalStore';
import { pull } from 'lodash';

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
    const nullCheck = change === null;
    console.log('Firestore: auth change:', nullCheck ? change : 'user is set');
    nullCheck ? null : change.getIdToken(true);
    //console.log('Firestore: auth change:', change);
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

export async function reauthenticate() {
    const user = auth.currentUser;
    if (user == undefined || user == null) {
        const newUser = await getItem('@fireUser');
        if (newUser == undefined || newUser == null) {
            console.log('Firestore: no past user tokens. logging out of app');
            return false;
        }
        console.log('Firestore: loading user as', newUser.email);
        auth.updateCurrentUser(newUser).catch(_err => {
            //console.log('Firestore: ignore', _err);
        });
        return true;
    } else {
        user.getIdToken(true).catch(_err => { }).finally(() =>
            console.log('Firestore: token refresh'));
        return true;
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
            return { status: FireStatusCodes.EMAIL_INVALID, data: null };
        } else {
            console.log("Firestore: returning unknown error:", error.code);
            return { status: FireStatusCodes.ERROR_BAD, data: null };
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

export async function postJob(jobDetail: Job, postID: string) {
    try {
        //console.log('Firestore:', postID, jobDetail);
        await setDoc(doc(db, "jobs", postID.toString()), jobDetail);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getJob() {
    try {
        const documents = await getDocs(collection(db, "jobs"));
        const filed = Array<Job>();
        documents.forEach(result => {
            const data = (result.data() as Job);
            filed.push({
                postID: result.id,
                description: data.description,
                position: data.position,
                recruiter: data.recruiter,
                salary: data.salary
            })
        });
        //console.log('Firestore: array unsort', filed);
        return filed.sort((a, b) => {
            if (a.postID > b.postID) {
                return -1;
            }
            if (a.postID < b.postID) {
                return 1;
            }
            return 0;
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function sendMessage(messageDetail: MessageStore, postID: string) {
    try {
        await setDoc(doc(db, "messages", postID), messageDetail);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getMessage(id: number) {
    try {
        const documents = await getDocs(collection(db, "messages"));
        const file = Array<MessageStore>();
        documents.forEach(result => {
            if (!result.id.includes(id.toString())) {
                return;
            }
            const data = result.data() as MessageStore;
            data.history.sort((a, b) => a.time - b.time);
            file.push(data);
        });

        return file.sort((a, b) => {
            return (a.history[a.history.length - 1].time - b.history[a.history.length - 1].time);
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSingleMessage(idA: number, idB: number) {
    try {
        const docID = idA.toString() + '_' + idB.toString();
        const mesRef = await getDoc(doc(db, 'messages', docID));
        if (mesRef.exists()) {
            return mesRef.data() as MessageStore;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function findUser(id: number) {
    try {
        const userRef = collection(db, "users");
        const q = query(userRef, where('id', '==', id));

        const qGet = await getDocs(q);
        if (qGet.size > 1) {
            console.error('Firestore: more than one user has that ID idk how');
            return null;
        }
        return qGet.docs[0].data() as User;
    } catch (error) {
        console.error('Firestore: user not found', error);
        return null;
    }
}
