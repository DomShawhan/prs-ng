import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../model/vendor';

const URL: string = 'http://localhost:8080/api/vendors';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get(URL + '/') as Observable<Vendor[]>;
  }

  getVendorById(id: number): Observable<Vendor> {
    return this.http.get(URL + '/' + id) as Observable<Vendor>;
  }

  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post(URL, vendor) as Observable<Vendor>;
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put(URL + '/' + vendor.id, vendor) as Observable<Vendor>;
  }

  deleteVendor(id: number): Observable<boolean> {
    return this.http.delete(URL + '/' + id) as Observable<boolean>;
  }
}
