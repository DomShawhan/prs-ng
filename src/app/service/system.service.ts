import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = new User();

  constructor(
    private router: Router
  ) { }

  checkAdmin(): boolean {
    return this.loggedInUser.id != 0 && this.loggedInUser.admin;
  }

  checkReviewer(): boolean {
    return this.loggedInUser.id != 0 && this.loggedInUser.reviewer;
  }

  checkLogin(): void {
    if(this.loggedInUser.id == 0) {
      this.router.navigateByUrl("/user/login");
    }
  }

  userLoggedIn(): boolean {
    return (this.loggedInUser.id != 0);
  }
}
