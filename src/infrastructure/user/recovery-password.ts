export interface IRecoveryPasswordPayload {
    email: string;
}

export function recoveryPassword(payload: IRecoveryPasswordPayload): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(payload.email.endsWith("gmail.com")) {
                resolve(true);
            } else {
                reject(false);
            }
        }, 600);
    })
}
