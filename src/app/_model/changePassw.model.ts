export class changePasswModel{
    oldPassword: string;
    password: string;
    repeatPassword: string;

    constructor(oldPassword: string, password: string, repeatPassword: string) {
        this.oldPassword = oldPassword;
        this.password = password;
        this.repeatPassword = repeatPassword;
    }
}