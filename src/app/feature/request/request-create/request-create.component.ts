import { Component } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

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
    private router: Router,
    private systemSvc: SystemService
  ){}
  
  ngOnInit(): void {
    this.systemSvc.checkLogin();

    this.request.user = this.systemSvc.loggedInUser;
  }

  save(): void {
    this.requestSvc.createRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        this.message = this.message = err.error.message;;
      },
      complete: () => {}
    });
  }
}
