import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent extends BaseComponent implements OnInit{
  title: string = "Vendor-List";
  vendors?: Vendor[] = undefined;

  constructor(
    private vendorSvc: VendorService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.vendorSvc.getAllVendors().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }
}
