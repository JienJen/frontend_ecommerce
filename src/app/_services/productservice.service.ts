import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor() { 
    axios.defaults.baseURL = "http://localhost:8080/api/products"
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data; boundary=someArbitraryUniqueString';
      }
  
    request(method: string, url: string, data: any): Promise<any>{
      return axios({
        method: "POST",
        url: url,
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer '
        }
      });
    }
}
