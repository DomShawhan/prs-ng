import { Component } from '@angular/core';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrl: './line-item-edit.component.css'
})
export class LineItemEditComponent {
  title: string = 'Line Item Edit';
  lineItemId: number = 0;
  lineItem: LineItem = new LineItem();
  message?: string = undefined;
  products: Product[] = [];

  constructor(
    private liSvc: LineitemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.lineItemId = parms['id'];
        this.liSvc.getLineItemById(this.lineItemId).subscribe({
          next: (resp) => {
            this.lineItem = resp;
          }, 
          error: (err) => {
            this.message = err.error.message;
          },
          complete: () => {}
        });
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
    this.productSvc.getAllProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

  save(): void {
    this.liSvc.updateLineItem(this.lineItem).subscribe({
      next: (resp) => {
        this.lineItem = resp;
        this.router.navigateByUrl('/request/lines/'+this.lineItem.request.id);
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}
