import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.css'
})
export class VendorCreateComponent extends BaseComponent implements OnInit {
  title: string = "Vendor-Create";
  vendor: Vendor = new Vendor();

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    sysSvc: SystemService
  ){
    super(sysSvc);
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsAdmin) {
      this.router.navigateByUrl('/vendor/list');
    }
  }

  save(): void {
    this.vendorSvc.createVendor(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor/detail/' + this.vendor.id);
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    });
  }
}
