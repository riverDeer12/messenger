import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private service: AuthService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.service.userLogged()){
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });

            return next.handle(clonedRequest).pipe(
                tap(
                    success => {},
                    error => {
                        if(error.status == 401){
                            console.log("User is not logged redirecting to login...");
                            this.router.navigateByUrl('login');
                        }
                    }
                )
            )
        } else {
            return next.handle(req.clone());
        }
    }
}