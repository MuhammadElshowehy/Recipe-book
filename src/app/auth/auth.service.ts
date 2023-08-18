import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { SaveFetchRecipesAndIngredientsService } from '../shared/save&fetch-recipes&ingredients.service';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Ingredient } from '../shared/ingredient.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser = new BehaviorSubject<User>(null);
  clearTimer = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private saveFetchRecipesAndIngredientsService: SaveFetchRecipesAndIngredientsService,
    private shoppingListService: ShoppingListService
  ) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
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
          this.fetchData();
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
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
          this.fetchData();
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
      this.fetchData();
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

  fetchData() {
    this.saveFetchRecipesAndIngredientsService.fetchRecipes().subscribe();
    this.saveFetchRecipesAndIngredientsService
      .fetchIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.shoppingListService.fetchedIngredients(ingredients);
        }
      });
  }

  private handleError(resError: HttpErrorResponse) {
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
