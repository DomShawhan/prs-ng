import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css'
})
export class RequestEditComponent implements OnInit {
  title: string = 'Request-Edit';
  request: Request = new Request();
  requestId: number = 0;
  message?: string = undefined;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (parms) => {
            this.request = parms;
          },
        });
      },
      error: (err) => {
        console.log('Error editing Request: ', err);
      },
      complete: () => {},
    });
  }

  save(): void {
    // NOTE: Check for existence of request title before save?
    this.requestSvc.updateRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        console.log('Error updating request: ', err);
        this.message = 'Error updating Request.';
      },
      complete: () => {},
    });
  }
}
