import Axios from 'axios';

const inst = Axios.create({
    baseURL: 'http://ssm.mywire.org:3405/api/',
    timeout: 1000
});

export async function userAuth(user, password) {
    //return inst.post('auth', { userName: user, pass: password });
    return {data: true}; // Remove this line to enable db auth again
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
