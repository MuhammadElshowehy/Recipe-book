import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService
  ) {}
  collapsed = true;
  isAuthenticated: boolean = false;
  obs: Subscription;

  ngOnInit() {
    this.obs = this.authService.authUser.subscribe((authUser) => {
      this.isAuthenticated = !!authUser;
    });
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  onLogout(){
    this.authService.logOut();
  }
}
