import {IAuthorizePayload, IAuthorizeResponse, IExtUser} from "@/infrastructure/user/authorize";
import {IRecoveryPasswordPayload} from "@/infrastructure/user/recovery-password";

export default class Infrastructure {
    static user = {
        authorize (payload: IAuthorizePayload): Promise<IAuthorizeResponse | {error: string}> {
            return import("./user/authorize").then((module) => {
                return module.authorize(payload);
            });
        },
        getUser (token: string): Promise<IExtUser> {
            return import("./user/get-user").then((module) => {
                return module.getUser(token);
            });
        },
        recoveryPassword (payload: IRecoveryPasswordPayload): Promise<boolean> {
            return import("./user/recovery-password").then((module) => {
                return module.recoveryPassword(payload);
            });
        },
    };
}
