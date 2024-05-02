
export type compactUser = {
    id?: number,
    username: string,
    email?: string
}

export const DEV_USER = {
    sid: 0,
    username: 'Developer',
    firstname: 'Deve',
    lastname: 'Loper',
    email: 'dev0@toromail.csudh.edu',
    major: 'Computer Science',
    country: 'USA',
    type: 'admin'
}

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
