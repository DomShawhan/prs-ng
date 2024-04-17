import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  title: string = 'User-Edit';
  user: User = new User();
  userId: number = 0;
  message?: string = undefined;
  
  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.userId = parms['id'];
        this.userSvc.getUserById(this.userId).subscribe({
          next: (resp) => {
            this.user = resp;
          },
          error: (err) => {
            this.message = err.error.message;
          },
          complete: () => {}
        });
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

  save(): void {
    this.userSvc.updateUser(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user/list');
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    })
  }

}
