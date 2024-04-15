import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title: string = 'Menu';
  menuItems: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.menuItems.push(new MenuItem("User", "/user/list", "User List"));
    this.menuItems.push(new MenuItem("Vendor", "/vendor/list", "Vendor List"));
    this.menuItems.push(new MenuItem("Product", "/product/list", "Product List"));
    this.menuItems.push(new MenuItem("Request", "/request/list", "Request List"));
  }

}
