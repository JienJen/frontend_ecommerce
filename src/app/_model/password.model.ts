export class passwModel{
    password: string;
    repeatPassword: string;
    token: string;

    constructor(password: string, repeatPassword: string, token: string) {
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.token = token;
    }
}