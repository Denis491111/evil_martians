import {UserMock} from "@/infrastructure/common";

export interface IAuthorizePayload {
    email: string;
    password: string;
}

export interface IExtUser {
    name: string;
    surname: string;
    email: string;
}

export interface IAuthorizeResponse {
    token: string;
    user: IExtUser;
}

export function authorize(payload: IAuthorizePayload): Promise<IAuthorizeResponse | {error: string}> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(payload.password !== "123456") {
                reject({error: "Incorrect password"})
            } else {
                resolve({token: "123123123123123123123123", user: UserMock});
            }
        }, 800);
    })
}
