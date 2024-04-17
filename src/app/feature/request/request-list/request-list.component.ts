import { Component } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  title: string = "Request-List";
  requests?: Request[] = undefined;
  message?: string = undefined

  constructor(private requestSvc: RequestService) {}
  
  ngOnInit(): void {
    this.requestSvc.getAllRequests().subscribe({
      next: (resp) => {
        this.requests = resp;
        this.requests.sort((a, b) => {return +new Date(a.dateNeeded) - +new Date(b.dateNeeded)})
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    })
  }
}
