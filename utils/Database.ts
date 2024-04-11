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

type CompactUser = {
    id?: number,
    username: string,
    email?: string
}

const inst = Axios.create({
    baseURL: 'http://ssm.mywire.org:3405/api/',
    //baseURL: 'http://localhost:3405/api/',
    timeout: 1000,
});

export async function userAuth(user: string, password: string) {
    return inst.post('auth', { userName: user, pass: password });
    //return { data: true } // For development use
}

export async function userCreate(newUser: User) {
    return inst.post('create', newUser);
}

export async function userVerify(user: CompactUser) {
    return inst.post('verify', user);
}

export async function userReset(data: { password: string, key: string }) {
    return inst.post('reset', data);
}

export async function messageGet(data: string) {
    return inst.post('inbox', data);
}

export async function messageCreate(data: any) {
    console.log(data);
    return inst.post('outbox', data);
}
