import Axios from 'axios';
import { DEV_USER, compactUser } from '../components/Types';

const inst = Axios.create({
    //baseURL: 'http://ssm.mywire.org:3405/api/', //Production server
    baseURL: 'http://localhost:3405/api/', //Dev with phyiscal device
    //baseURL: 'http://10.0.2.2:3405/api/', //Dev with emulator
    //baseURL: 'http://192.168.137.1:3405/api/', //Dev again
    timeout: 2000,
});

export async function userAuth(user: string, password: string) {
    //return inst.post('auth', { userName: user, pass: password });
    return {data: DEV_USER, status: 200}; // For development use
}

export async function userVerify(user: compactUser) {
    return inst.post('verify', user);
}

export async function userReset(data: { password: string, key: string }) {
    return inst.post('reset', data);
}

export async function messageGet(data: string) {
    return inst.post('inbox', data);
}

export async function messageCreate(data: any) {
    return inst.post('outbox', data);
}
