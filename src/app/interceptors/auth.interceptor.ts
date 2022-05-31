import { Injectable } from "@angular/core";
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = sessionStorage.getItem('token');

        if (token) {
            request = request.clone({
                headers: request.headers.set("Authorization", `Bearer ${token}`)
            });
        }

        return next.handle(request);
    }
}