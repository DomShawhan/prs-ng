import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent extends BaseComponent implements OnInit {
  title: string = "Request-Create";
  request: Request = new Request();

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    sysSvc: SystemService
  ){
    super(sysSvc);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsLoggedIn) {
      this.router.navigateByUrl('/user/login');
    }

    this.request.user = this.loggedInUser;
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
