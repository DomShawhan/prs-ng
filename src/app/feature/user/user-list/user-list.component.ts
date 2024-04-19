import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';

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
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.userSvc.getAllUsers().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }

}
