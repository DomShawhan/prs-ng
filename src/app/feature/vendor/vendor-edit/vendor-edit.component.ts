import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css'
})
export class VendorEditComponent extends BaseComponent implements OnInit {
  title: string = 'Vendor-Edit';
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  
  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    sysSvc: SystemService,
    private route: ActivatedRoute
  ){
    super(sysSvc);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsAdmin) {
      this.router.navigateByUrl('/vendor/list');
    }
    this.route.params.subscribe({
      next: (parms) => {
        this.vendorId = parms['id'];
        this.vendorSvc.getVendorById(this.vendorId).subscribe({
          next: (resp) => {
            this.vendor = resp;
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
  }

  save(): void {
    this.vendorSvc.updateVendor(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor/detail/' + this.vendor.id);
      }, 
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {}
    })
  }
}
