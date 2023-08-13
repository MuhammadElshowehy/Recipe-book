import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.authUser.pipe(
      take(1),
      exhaustMap((authUser) => {
        if (!authUser) {
          return next.handle(req);
        } else {
          let modifiedReq = req.clone({
            params: new HttpParams().set('auth', authUser.token),
          });
          return next.handle(modifiedReq);
        }
      })
    );
  }
}
