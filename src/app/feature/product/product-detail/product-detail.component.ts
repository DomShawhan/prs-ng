import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Product-Detail';
  product: Product = new Product();
  productId: number = 0;

  constructor(
    private productSvc: ProductService,
    router: Router,
    private route: ActivatedRoute,
    sysSvc: SystemService
  ) {
    super(sysSvc, router);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.productId = parms['id'];
        this.productSvc.getProductById(this.productId).subscribe({
          next: (parms) => {
            this.product = parms;
          },
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {},
        });
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }

  delete(): void {
    this.productSvc.deleteProduct(this.productId).subscribe({
      next: (resp) => {
        if(resp == false) {
          this.message = "Error while deleting the Product";
        } else {
          this.router.navigateByUrl('/product/list');
        }
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }
}
