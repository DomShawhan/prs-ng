import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrl: './request-review-list.component.css'
})
export class RequestReviewListComponent extends BaseComponent implements OnInit {
  title: string = 'Request-Review';
  requests: Request[] = [];

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    sysSvc: SystemService
  ){
    super(sysSvc);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsReviewer) {
      this.router.navigateByUrl('/request/list');
    }
    this.requestSvc.getRequestsToReview(this.loggedInUser.id).subscribe({
      next: (resp) => {
        this.requests = resp;
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
