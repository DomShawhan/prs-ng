import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent implements OnInit{
  title: string = "Vendor-List";
  vendors?: Vendor[] = undefined;

  constructor(private vendorSvc: VendorService) {}
  
  ngOnInit(): void {
    this.vendorSvc.getAllVendors().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {}
    })
  }
}
