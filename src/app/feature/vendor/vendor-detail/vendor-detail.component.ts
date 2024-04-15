import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css'
})
export class VendorDetailComponent implements OnInit {
  title: string = 'Vendor-Detail';
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

  delete(): void {
    this.vendorSvc.deleteVendor(this.vendorId).subscribe({
      next: (resp) => {
        if(resp == false) {
          console.log('Error deleting vendor');
          this.message = 'Error deleting vendor';
        } else {
          this.router.navigateByUrl('/vendor/list');
        }
      }, 
      error: (err) => {
        console.log('Error deleting vendor: ', err);
        this.message = 'Error deleting vendor';
      },
      complete: () => {}
    });
  }
}
