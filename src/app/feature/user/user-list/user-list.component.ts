import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent extends BaseComponent implements OnInit {
  title: string = "User-List";
  users?: User[] = undefined;

  constructor(
    private userSvc: UserService,
    sysSvc: SystemService
  ) {
    super(sysSvc);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.userSvc.getAllUsers().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

}
