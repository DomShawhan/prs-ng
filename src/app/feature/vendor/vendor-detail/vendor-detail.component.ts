import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';
import { VendorSummary } from '../../../model/vendor-summary';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css'
})
export class VendorDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Vendor-Detail';
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  vendorSummary: VendorSummary = new VendorSummary();

  constructor(
    private vendorSvc: VendorService,
    router: Router,
    private route: ActivatedRoute,
    sysSvc: SystemService
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.vendorId = parms['id'];
        this.vendorSvc.getVendorById(this.vendorId).subscribe({
          next: (resp) => {
            this.vendor = resp;
          },
          error: (err) => {
            this.parseMessage(err.error.message);
          },
          complete: () => {}
        });
        this.vendorSvc.getVendorSummary(this.vendorId).subscribe({
          next: (resp) => {
            this.vendorSummary = resp;
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
  }

  delete(): void {
    this.vendorSvc.deleteVendor(this.vendorId).subscribe({
      next: (resp) => {
        if(resp == false) {
          this.message = 'Error deleting vendor';
        } else {
          this.router.navigateByUrl('/vendor/list');
        }
      }, 
      error: (err) => {
        this.parseMessage(err.error.message);
      },
      complete: () => {}
    });
  }
}
