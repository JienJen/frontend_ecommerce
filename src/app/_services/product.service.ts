import { Injectable } from '@angular/core';
import { Products } from '../_model/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { 
    
    }
  
  
    public getProductDetails() {
      return this.httpClient.get<Products[]>("http://localhost:8080/api/products/");
    }
  }
  