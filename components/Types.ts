
export type User = {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    country?: string,
    major?: string,
    type: string,
}

export type Messages = {
    userIdSender: number,
    userIDReceiver: number,
    message: string,
    read: boolean,
}