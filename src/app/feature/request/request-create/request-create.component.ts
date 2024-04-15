import { Component } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent {
  title: string = "Request-Create";
  request: Request = new Request();
  message?: string = undefined;

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.userSvc.getUserById(24).subscribe({
      next: (resp) => {
        this.request.user = resp;
      },
      error: (err) => {
        console.log("Get user error: ", err);
        this.message = "Error while getting user";
      },
      complete: () => {}
    })
  }

  save(): void {
    this.requestSvc.createRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        console.log("Save error: ", err);
        this.message = "Error while saving";
      },
      complete: () => {}
    });
  }
}
