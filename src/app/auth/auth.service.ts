import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  authUser = new BehaviorSubject<User>(null);
  clearTimer = null;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBThqdP8l4w4sHMGR831pYzU4804sZc27I',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBThqdP8l4w4sHMGR831pYzU4804sZc27I',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      userData._tokenExpirationDate
    );
    // console.log(loadedUser); // authUser

    if (loadedUser.token) {
      this.authUser.next(loadedUser);
      let expDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        // console.log(expDuration); // rest time for token expiration.
      this.autoLogout(expDuration);
    }
  }

  logOut() {
    this.authUser.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.clearTimer) {
      clearTimeout(this.clearTimer);
    }
    this.clearTimer = null;
  }

  autoLogout(expiresIn: number) {
    this.clearTimer = setTimeout(() => {
      this.logOut();
    }, expiresIn);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: string
  ) {
    // expiresIn === 3600 seconds.
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
    // expDate: The expiration date of the token.
    const user = new User(email, userId, idToken, expDate);
    this.authUser.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(resError: HttpErrorResponse) {
    console.log(resError);
    let errorMsg = 'An unknown error ocurred!';
    if (!resError.error || !resError.error.error) {
      return throwError(errorMsg);
    }
    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Email is not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'password is incorrect!';
        break;
    }
    return throwError(errorMsg);
  }
}
