
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

export type Message = {
    userIDSender: number,
    userIDReceiver: number | number[],
    message: string,
    read: boolean,
    time: number,
}

export type Job = {
    position: string,
    recruiter: string,
    description: string,
    salary: string,
    postID?: string,
}

export type MessageStore = {
    user: User[],
    history: Message[],
}
