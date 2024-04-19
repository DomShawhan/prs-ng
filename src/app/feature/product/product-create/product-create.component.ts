import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product';
import { Router } from '@angular/router';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent extends BaseComponent implements OnInit {
  title: string = "Product-Create";
  product: Product = new Product();
  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    sysSvc: SystemService
  ){
    super(sysSvc);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsAdmin) {
      this.router.navigateByUrl('/product/list');
    }
    this.vendorSvc.getAllVendors().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

  save(): void {
    this.productSvc.createProduct(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/product/detail/'+ this.product.id);
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
