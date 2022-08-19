import { Injectable } from "@angular/core";
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private snackbar: MatSnackBar,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = sessionStorage.getItem('token');

        if (token) {
            request = request.clone({
                headers: request.headers.set("Authorization", `Bearer ${token}`)
            });
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error.error instanceof ErrorEvent) {
                    return throwError(() => new Error(error));
                }
                switch (error.status) {
                    case 401:
                        const message: string = error.url.indexOf('users/login') > -1
                            ? "Invalid username or password."
                            : "Your session has expired.  Log in again to continue working.";

                        this.snackbar.open(message, 'Close', { duration: 10000 });
                        this.router.navigate(['/']);
                        return of();

                    case 409:
                        this.snackbar.open("An error occured creating your account.  Contact your account representative for assistance.", 'Close', { duration: 10000 });
                        return of();

                    default:
                        this.snackbar.open("An error occured processing your request.  Try again in a few minutes.", 'Close', { duration: 10000 });
                        return throwError(() => new Error(error));
                }


            })) as Observable<HttpEvent<any>>;
    }
}