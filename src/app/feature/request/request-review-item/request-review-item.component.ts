import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LineitemService } from '../../../service/lineitem.service';
import { LineItem } from '../../../model/line-item';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrl: './request-review-item.component.css'
})
export class RequestReviewItemComponent extends BaseComponent implements OnInit {
  title: string = 'Request Approve';
  request: Request = new Request;
  requestId: number = 0;
  lineItems: LineItem[] = [];
  reasonForRejection: string = '';

  constructor(
    private requestSvc: RequestService,
    sysSvc: SystemService,
    private route: ActivatedRoute,
    router: Router,
    private liSvc: LineitemService
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsReviewer){
      this.router.navigateByUrl('/requests/list');
    }
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
          },
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {}
        });
        this.liSvc.getLineItemsByRequest(this.requestId).subscribe({
          next: (resp) => {
            this.lineItems = resp;
          },
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {}
        });
        if(this.request.user.id == this.loggedInUser.id){
          this.router.navigateByUrl('/request/list');
        }
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }

  reject(): void {
    if(this.reasonForRejection != '') {
      this.requestSvc.rejectRequest(this.request, this.reasonForRejection).subscribe({
        next: (resp) => {
          this.request = resp;
          this.router.navigateByUrl('/request/list');
        },
        error: (err) => {
          this.parseMessage(err.error.message);
        },
        complete: () => {}
      });
    } else {
      this.message = 'You must specify a reason for the rejection.';
    }
  }

  approve(): void {
    this.requestSvc.approveRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }
}
