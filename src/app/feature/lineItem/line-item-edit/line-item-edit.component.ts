import { Component, OnInit } from '@angular/core';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { Product } from '../../../model/product';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrl: './line-item-edit.component.css'
})
export class LineItemEditComponent extends BaseComponent implements OnInit {
  title: string = 'Line Item Edit';
  lineItemId: number = 0;
  lineItem: LineItem = new LineItem();
  request: Request = new Request();
  products: Product[] = [];

  constructor(
    private liSvc: LineitemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    router: Router,
    sysSvc: SystemService
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.lineItemId = parms['id'];
        this.liSvc.getLineItemById(this.lineItemId).subscribe({
          next: (resp) => {
            this.lineItem = resp;
            this.requestSvc.getRequestById(this.lineItem.request.id).subscribe({
              next: (resp) => {
                this.request = resp;
                console.log(this.request.user.id, this.loggedInUser.id)
                if(this.request.user.id != this.loggedInUser.id || this.request.status != 'NEW') {
                  this.router.navigateByUrl('/request/list');
                }
              }, 
              error: (err) => {
                this.parseMessage(err.error.message);
              },
              complete: () => {}
            });
          }, 
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {}
        });
      }, 
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
    this.productSvc.getAllProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      }, 
      error: (err) => {
        this.parseMessage(err.error.message);
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
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}
