import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: Product){
    return this.httpClient.post<Product>("localhost:8080/addNewProduct", product);
    }

  public getAllProducts() {
    return this.httpClient.get<Product[]>("localhost:8080/getAllProducts");
  }
}
