import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { 
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.headers.post["Content-type"] = "application/json"
    }
  
    request(method: string, url: string, data: any): Promise<any>{
      return axios({
        method: method,
        url: url,
        data: data
      });
    }
  }
  