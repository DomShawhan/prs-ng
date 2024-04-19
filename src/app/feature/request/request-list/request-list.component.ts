import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent extends BaseComponent implements OnInit {
  title: string = "Request-List";
  requests?: Request[] = undefined;

  constructor(
    private requestSvc: RequestService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.requestSvc.getAllRequests().subscribe({
      next: (resp) => {
        this.requests = resp;
        this.requests.sort((a, b) => {return +new Date(a.dateNeeded) - +new Date(b.dateNeeded)})
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    })
  }
}
