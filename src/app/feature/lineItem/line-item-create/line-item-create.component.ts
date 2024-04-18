import { Component, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { LineitemService } from '../../../service/lineitem.service';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrl: './line-item-create.component.css'
})
export class LineItemCreateComponent extends BaseComponent implements OnInit {
  title: string = 'Line Item Create';
  requestId: number = 0;
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  requestUser: User = new User();

  constructor(
    private liSvc: LineitemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    sysSvc: SystemService
  ) {
    super(sysSvc);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['requestid'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) => {
            this.lineItem.request = resp;
            this.requestUser = resp.user;
            console.log(this.requestUser.id)
            if(!this.userIsLoggedIn || this.requestUser.id != this.loggedInUser.id || this.lineItem.request.status != 'NEW') {
              this.router.navigateByUrl('/request/list');
            }
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
    this.liSvc.createLineItem(this.lineItem).subscribe({
      next: (resp) => {
        this.lineItem = resp;
        this.router.navigateByUrl('/request/lines/'+this.requestId);
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
