import Axios from 'axios';

type User = {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    country?: string,
    study?: string,
    password: string
}

type CompUser = {
    id: number,
    username: string,
    email: string
}

const inst = Axios.create({
    baseURL: 'http://ssm.mywire.org:3405/api/',
    //baseURL: 'http://localhost:3405/api/',
    timeout: 5000
});

export async function userAuth(user: string, password: string) {
    return inst.post('auth', { userName: user, pass: password });
    //return { data: true } // For development use
}

export async function userCreate(newUser: User) {
    return inst.post('create', newUser);
}

export async function userVerify(user: CompUser) {
    return inst.post('verify', user);
}

export async function userReset(data: { password: string, id: number }) {
    return inst.post('reset', data);
}

export async function messageGet() {
    // TODO: Create function to recieve message from a database.
}

export async function messageCreate() {
    // TODO: Create function to send message to database.
}
