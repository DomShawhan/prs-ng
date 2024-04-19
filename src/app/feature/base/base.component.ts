import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { SystemService } from '../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {
  message?: string = undefined;
  loggedInUser: User = new User();
  userIsAdmin: boolean = false;
  userIsReviewer: boolean = false;
  userIsLoggedIn: boolean = false;

  constructor(
    private sysSvc: SystemService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.userIsLoggedIn = this.loggedInUser.id != 0;
    this.userIsAdmin = this.loggedInUser.admin;
    this.userIsReviewer = this.loggedInUser.reviewer;
    if(!this.userIsLoggedIn) {
      this.router.navigateByUrl('user/login');
    }
  }

  parseMessage(messageFromBE: string): void {
    if(messageFromBE != undefined) {
      this.message = messageFromBE.replaceAll(';', '; \n');
    }
  }
}
