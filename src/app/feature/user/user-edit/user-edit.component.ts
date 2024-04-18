import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent extends BaseComponent implements OnInit {
  title: string = 'User-Edit';
  user: User = new User();
  userId: number = 0;
  
  constructor(
    private userSvc: UserService,
    private router: Router,
    sysSvc: SystemService,
    private route: ActivatedRoute
  ){
    super(sysSvc);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.userId = parms['id'];
        if(this.loggedInUser.id == 0 || (this.loggedInUser.id != this.userId && !this.userIsAdmin)) {
          this.router.navigateByUrl('/user/list');
        } else {
          this.userSvc.getUserById(this.userId).subscribe({
            next: (resp) => {
              this.user = resp;
            },
            error: (err) => {
              this.message = err.error.message;
            },
            complete: () => {}
          });
        }
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
