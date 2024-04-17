import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product';
import { Router } from '@angular/router';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  title: string = "Product-Create";
  product: Product = new Product();
  message?: string = undefined;
  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router
  ){}
  
  ngOnInit(): void {
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
        this.router.navigateByUrl('/product/list');
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
