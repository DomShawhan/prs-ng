import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  title: string = 'User-Detail';
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

  delete(): void {
    this.userSvc.deleteUser(this.userId).subscribe({
      next: (resp) => {
        if(resp == false) {
          this.message = 'Error deleting user';
        } else {
          this.router.navigateByUrl('/user/list');
        }
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
