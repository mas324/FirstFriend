import * as Firebase from 'firebase/app';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth, confirmPasswordReset, AuthErrorCodes, signOut as fireOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job, Message, MessageStore, User } from '../components/Types';
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

export async function initializeMessages(users: User[]) {
    try {
        let userIDs = '';
        for (let i = 0; i < users.length; i++) {
            if (i === users.length - 1) {
                userIDs += users[i].id.toString();
            } else {
                userIDs += users[i].id.toString() + 'U';
            }
        }
        //console.log('check 1', userIDs, users);
        const checkDoc = await getDoc(doc(db, 'messages', userIDs));
        if (checkDoc.exists()) {
            return false;
        }
        //console.log('check 2');
        const docRef = doc(db, 'messages', userIDs);
        await setDoc(docRef, { users: users });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function sendMessage(messageDetail: Message, postID: string) {
    try {
        const userCol = collection(db, 'messages', postID + '/history');
        await addDoc(userCol, messageDetail);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getMessage(id: number) {
    try {
        const documents = await getDocs(collection(db, "messages"));
        if (documents.empty) {
            return null;
        }
        console.log('Firestore: getting contacts');
        const filteredUsers = Array<Array<User>>()
        documents.forEach(result => {
            if (!result.exists()) {
                return;
            }
            //console.log('Firestore:', result.data());
            const userResult = result.data().users as User[];
            const finder = userResult.find((value) => value.id === id);
            if (finder !== undefined) {
                console.log('Firestore: data add');
                filteredUsers.push(userResult);
            }
        });

        if (filteredUsers.length === 0) {
            return null;
        }

        const filteredDocs = Array<MessageStore>();
        for (let i = 0; i < filteredUsers.length; i++) {
            let docID = '';
            for (let j = 0; j < filteredUsers[i].length; j++) {
                const ru = filteredUsers[i];
                if (j === ru.length - 1) {
                    docID += ru[j].id.toString();
                } else {
                    docID += ru[j].id.toString() + 'U';
                }
            }

            filteredDocs.push({
                user: filteredUsers[i],
                history: await getSingleMessage(docID),
            });
        }
        //console.log('Firestore: returning contacts', filteredDocs);
        return filteredDocs;
    } catch (error) {
        console.error('Firestore: getmessage:', error);
        return null;
    }
}

export async function getSingleMessage(docID: string) {
    console.log('Firestore: getting history for ', docID);
    try {
        const messageRef = doc(db, 'messages', docID);
        const messageDoc = await getDoc(messageRef);
        if (messageDoc.exists()) {
            const historyDoc = await getDocs(collection(messageRef, 'history'));
            const history = Array<Message>();
            historyDoc.forEach((post) => {
                history.push(post.data() as Message);
            });
            history.sort((a, b) => a.time - b.time);
            console.log('Firestore: history', history);
            return history;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getReadHistory(id:number) {
    
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
        console.log('Firestore: user got', qGet.docs[0].data());
        return qGet.docs[0].data() as User;
    } catch (error) {
        console.error('Firestore: user not found', error);
        return null;
    }
}

export async function updateProfile(user: User) {
    try {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userDoc, user);
        console.log('Firestore: updated user');
    } catch (err) {
        console.error('Firestore: error user data', err);
    }
}
