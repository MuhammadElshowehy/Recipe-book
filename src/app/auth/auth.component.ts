import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  @ViewChild('authForm') authForm: NgForm;

  isLoading: boolean = false;
  error: string = null;
  isLoginMode: boolean = true;

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const pass = this.authForm.value.password;
    if (this.authForm.invalid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      // send login req:
      authObs = this.authService.login(email, pass);
    } else {
      // send signUP req:
      authObs = this.authService.signUp(email, pass);
    }
    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    );
  }
}
