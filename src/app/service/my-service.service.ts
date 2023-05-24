import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviorments/environment';
import { DataModel } from '../model/my-model';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  endPointURL: string = environment.endPointURL;
  constructor(private http: HttpClient) { }
  getDataStock: string = 'get_data';
  updateDataStock: string = 'update_data';
  addDataStock: string = 'insert_single_data'

  getStockData() {
    debugger;
    const url = `${this.endPointURL}${this.getDataStock}`;
    return this.http.get(url);
  }
  updateStockData(data: DataModel) {
    debugger;
    const url = `${this.endPointURL}${this.updateDataStock}`;
    return this.http.put(url, data);
  }
  addNewStockData(data: DataModel) {
    debugger;
    const url = `${this.endPointURL}${this.addDataStock}`;
    return this.http.post(url, data);
  }
}
