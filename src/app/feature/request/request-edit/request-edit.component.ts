import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css'
})
export class RequestEditComponent extends BaseComponent implements OnInit {
  title: string = 'Request-Edit';
  request: Request = new Request();
  requestId: number = 0;

  constructor(
    private requestSvc: RequestService,
    router: Router,
    private route: ActivatedRoute,
    sysSvc: SystemService
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) => {
            if(resp.status == 'NEW') {
              this.request = resp;
            } else {
              this.router.navigateByUrl('/request/list');
            }
          },
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {}
        });
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }

  save(): void {
    this.requestSvc.updateRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/lines/' + this.request.id);
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {},
    });
  }
}
