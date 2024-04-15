import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css'
})
export class VendorEditComponent implements OnInit {
  title: string = 'Vendor-Edit';
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  message?: string = undefined;
  
  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.vendorId = parms['id'];
        this.vendorSvc.getVendorById(this.vendorId).subscribe({
          next: (resp) => {
            this.vendor = resp;
          },
          error: (err) => {
            console.log('Get by Id error for id: ' + this.vendorId, err);
            this.message = 'Get by Id error for id: ' + this.vendorId;
          },
          complete: () => {}
        });
      },
      error: (err) => {
        console.log('Get by Id error for id: ' + this.vendorId, err);
        this.message = 'Get by Id error for id: ' + this.vendorId;
      },
      complete: () => {}
    });
  }

  save(): void {
    this.vendorSvc.updateVendor(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor/list');
      }, 
      error: (err) => {
        console.log('Update error for id: ' + this.vendorId, err);
        this.message = err.error.message;
      },
      complete: () => {}
    })
  }
}
