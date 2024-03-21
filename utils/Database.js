import Axios from 'axios';

const inst = Axios.create({
    baseURL: 'http://localhost:3305/api/',
    timeout: '1000'
});

export async function userAuth(user, password) {
    return inst.post('auth', {userName: user, pass: password});
}

export async function userCreate(newUser) {
    return inst.post('create', newUser);
}
