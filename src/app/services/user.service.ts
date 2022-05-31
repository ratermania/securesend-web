import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";
import { Signup } from "../models/signup.model";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
    private user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    constructor(private httpClient: HttpClient, private router: Router) { }

    getUserFromToken(): BehaviorSubject<User> {
        if (!this.user.value.emailAddress) {
            const token = sessionStorage.getItem('token');
            this.setUserFromToken(token);
        }

        return this.user;
    }

    public login(data: Login): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/users/login`, data).pipe(
            map((response: any) => {
                sessionStorage.setItem('token', response.token);
                this.setUserFromToken(response.token);
            })
        );
    }

    public logout() {
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    public signup(data: Signup): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/users/signup`, data).pipe(
            map(response => {
                this.login({
                    emailAddress: data.emailAddress,
                    password: data.password
                });
            })
        );
    }

    private setUserFromToken(token: string | null) {
        if (token == null) {
            return;
        }

        const base64User: string = token.split('.')[1]
            .replace('-', '+')
            .replace('_', '/');

        const user: User = JSON.parse(atob(base64User));

        this.user.next(user);
    }
}