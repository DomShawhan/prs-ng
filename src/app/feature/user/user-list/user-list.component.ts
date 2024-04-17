import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  title: string = "User-List";
  users?: User[] = undefined;
  message?: string = undefined;

  constructor(private userSvc: UserService) {}
  
  ngOnInit(): void {
    this.userSvc.getAllUsers().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    })
  }

}
