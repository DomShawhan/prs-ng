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

  constructor(private requestSvc: RequestService) {}
  
  ngOnInit(): void {
    this.requestSvc.getAllRequests().subscribe({
      next: (resp) => {
        this.requests = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {}
    })
  }
}
