import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  title: string = "Product-List";
  products?: Product[] = undefined;

  constructor(private productSvc: ProductService) {}
  
  ngOnInit(): void {
    this.productSvc.getAllProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {}
    })
  }
}
