import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Product } from '../../../model/product';
import { VendorService } from '../../../service/vendor.service';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent extends BaseComponent implements OnInit {
  title: string = 'Product-Edit';
  product: Product = new Product();
  productId: number = 0;
  vendors: Vendor[] = [];

  constructor(
    private vendorSvc: VendorService,
    private productSvc: ProductService,
    router: Router,
    sysSvc: SystemService,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsAdmin) {
      this.router.navigateByUrl('/product/list');
    }
    this.route.params.subscribe({
      next: (parms) => {
        this.productId = parms['id'];
        this.productSvc.getProductById(this.productId).subscribe({
          next: (parms) => {
            this.product = parms;
          },
        });
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {},
    });
    this.vendorSvc.getAllVendors().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {},
    });
  }

  save(): void {
    // NOTE: Check for existence of product title before save?
    this.productSvc.updateProduct(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/product/detail/' + this.product.id);
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {},
    });
  }
  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
