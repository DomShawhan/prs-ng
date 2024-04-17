import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { SystemService } from '../../service/system.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title: string = 'Menu';
  menuItems: MenuItem[] = [];
  loggedInUser?: User = undefined;
  welcomeMsg?: string = undefined;

  constructor(
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    if(this.systemSvc.userLoggedIn()) {
      this.welcomeMsg = "Welcome, " + this.systemSvc.loggedInUser.firstname + " " + this.systemSvc.loggedInUser.lastname;
      this.loggedInUser = this.systemSvc.loggedInUser;
    }
    this.menuItems.push(new MenuItem("User", "/user/list", "User List"));
    this.menuItems.push(new MenuItem("Vendor", "/vendor/list", "Vendor List"));
    this.menuItems.push(new MenuItem("Product", "/product/list", "Product List"));
    this.menuItems.push(new MenuItem("Request", "/request/list", "Request List"));
  }

}
