import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/userLogin';
import { SystemService } from '../../../service/system.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../../../core/menu/menu.component';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  message?: string = undefined;

  constructor(
    private systemSvc: SystemService,
    private userSvc: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.systemSvc.loggedInUser = new User();
  }

  login(): void {
    this.userSvc.loginUser(this.userLogin).subscribe({
      next: (resp) => {
        this.systemSvc.loggedInUser = resp;
        this.router.navigate([MenuComponent]);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.message = "Invalid email/password combination. Try again";
      },
      complete: () => {}
    });
  }
}
