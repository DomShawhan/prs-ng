import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent extends BaseComponent implements OnInit {
  title: string = "User-Create";
  user: User = new User();

  constructor(
    private userSvc: UserService,
    sysSvc: SystemService,
    private router: Router
  ){
    super(sysSvc);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsAdmin){
      this.router.navigateByUrl('/user/list');
    }
  }

  save(): void {
    this.userSvc.createUser(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user/list');
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
