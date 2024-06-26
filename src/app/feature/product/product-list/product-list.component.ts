import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent extends BaseComponent implements OnInit {
  title: string = "Product-List";
  products?: Product[] = undefined;

  constructor(
    private productSvc: ProductService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.productSvc.getAllProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    })
  }
}
