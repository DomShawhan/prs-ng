import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent implements OnInit {
  title: string = 'Request-Detail';
  request: Request = new Request();
  requestId: number = 0;
  message?: string = undefined;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get the id from the url
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (parms) => {
            this.request = parms;
          },
          error: (err) => {
            this.message = err.error.message;
          },
          complete: () => {},
        });
      },
      error: (err) => {
        this.message = err.error.message;
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
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
