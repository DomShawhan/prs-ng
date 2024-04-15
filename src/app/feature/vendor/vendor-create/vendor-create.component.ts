import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.css'
})
export class VendorCreateComponent implements OnInit {
  title: string = "Vendor-Create";
  vendor: Vendor = new Vendor();
  message?: string = undefined;

  constructor(
    private vendorSvc: VendorService,
    private router: Router
  ){}
  
  ngOnInit(): void {
  }

  save(): void {
    this.vendorSvc.createVendor(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor/list');
      },
      error: (err) => {
        console.log("Save error: ", err);
        this.message = "Error while saving";
      },
      complete: () => {}
    });
  }
}
