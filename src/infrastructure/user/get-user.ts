import {UserMock} from "@/infrastructure/common";
import {IExtUser} from "@/infrastructure/user/authorize";

export function getUser(token: string): Promise<IExtUser> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(UserMock);
        }, 900);
    });
}
