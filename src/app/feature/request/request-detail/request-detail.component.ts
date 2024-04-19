import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Request-Detail';
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

  override ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (parms) => {
            this.request = parms;
          },
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {},
        });
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }

  delete(): void {
    this.requestSvc.deleteRequest(this.requestId).subscribe({
      next: (resp) => {
        if(resp == false) {
          this.message = "Error while deleting the request";
        } else {
          this.router.navigateByUrl('/request/list');
        }
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }
}
