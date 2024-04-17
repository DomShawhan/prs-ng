import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { LineItem } from '../../../model/line-item';
import { RequestService } from '../../../service/request.service';
import { LineitemService } from '../../../service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css'
})
export class RequestLinesComponent implements OnInit {
  title: string = 'Request-Items';
  request: Request = new Request();
  requestId: number = 0;
  lineItems: LineItem[] = [];
  message?: string = undefined;

  constructor (
    private requestSvc: RequestService,
    private liSvc: LineitemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
          }, 
          error: (err) => {
              this.message = err.error.message;
          },
          complete: () => {}
        });
        this.liSvc.getLineItemsByRequest(this.requestId).subscribe({
          next: (resp) => {
            this.lineItems = resp;
          }, 
          error: (err) => {
              this.message = err.error.message;
          },
          complete: () => {}
        });
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

  delete(id: number): void {
    this.liSvc.deleteLineItem(id).subscribe({
      next: (resp) => {
        if(!resp) {
          this.message = 'An error occured on the delete';
        } else {
          window.location.reload();
        }
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

  submit(): void {
    this.requestSvc.reviewRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
