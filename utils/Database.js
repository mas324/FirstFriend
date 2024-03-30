import Axios from 'axios';

const inst = Axios.create({
    baseURL: 'http://192.168.1.60:3305/api/',
    timeout: 1000
});

export async function userAuth(user, password) {
    return inst.post('auth', { userName: user, pass: password });
}

export async function userCreate(newUser) {
    return inst.post('create', newUser);
}

export async function messageGet() {
    // TODO: Create function to recieve message from a database.
}

export async function messageCreate() {
    // TODO: Create function to send message to database.
}
