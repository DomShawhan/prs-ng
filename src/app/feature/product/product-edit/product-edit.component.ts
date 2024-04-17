import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Product } from '../../../model/product';
import { VendorService } from '../../../service/vendor.service';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  title: string = 'Product-Edit';
  product: Product = new Product();
  productId: number = 0;
  vendors: Vendor[] = [];
  message?: string = undefined;

  constructor(
    private vendorSvc: VendorService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        this.message = err.error.message;
      },
      complete: () => {},
    });
    this.vendorSvc.getAllVendors().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {},
    });
  }

  save(): void {
    // NOTE: Check for existence of product title before save?
    this.productSvc.updateProduct(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/product/list');
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {},
    });
  }
  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
