import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  title: string = 'Product-Detail';
  product: Product = new Product();
  productId: number = 0;
  message?: string = undefined;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get the id from the url
    this.route.params.subscribe({
      next: (parms) => {
        this.productId = parms['id'];
        this.productSvc.getProductById(this.productId).subscribe({
          next: (parms) => {
            this.product = parms;
          },
          error: (err) => {
            console.log('Error editing Product: ', err);
          },
          complete: () => {},
        });
      },
      error: (err) => {
        console.log('Error editing Product: ', err);
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
        console.log('Error editing Product: ', err);
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
