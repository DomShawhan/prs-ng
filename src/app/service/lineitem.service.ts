import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item';

const URL: string = 'http://localhost:8080/api/lineitems';
const REQUEST_ITEM_URL: string = 'http://localhost:8080/api/lines-for-pr/';
@Injectable({
  providedIn: 'root'
})
export class LineitemService {

  constructor(
    private http: HttpClient
  ) { }

  getLineItemsByRequest(requestId: number): Observable<LineItem[]> {
    return this.http.get(REQUEST_ITEM_URL + requestId) as Observable<LineItem[]>;
  }

  getLineItemById(id: number): Observable<LineItem>{
    return this.http.get(URL + '/' + id) as Observable<LineItem>;
  }

  createLineItem(lineItem: LineItem): Observable<LineItem> {
    return this.http.post(URL, lineItem) as Observable<LineItem>;
  }

  updateLineItem(lineItem: LineItem): Observable<LineItem> {
    return this.http.put(URL + '/' + lineItem.id, lineItem) as Observable<LineItem>;
  }

  deleteLineItem(id: number): Observable<boolean> {
    return this.http.delete(URL + '/' + id) as Observable<boolean>;
  }
}
