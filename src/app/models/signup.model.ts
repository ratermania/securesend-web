import { User } from "./user.model";

export class Signup extends User {
    public password: string;
    public confirmPassword: string;
}