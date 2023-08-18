import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';
import { MyCartDetails } from '../_model/cart.model';
import { AllOrderDetails } from '../_model/allorders.model';
import { Users } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:8080/api/products/createNew", product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>("http://localhost:8080/api/products/view/all");
  }

  public deleteProduct(id: number){
    return this.httpClient.delete<string>("http://localhost:8080/api/products/delete/productId/" + id);
  }

  public getProductDetailsById(id:any){
    return this.httpClient.get<Product>("http://localhost:8080/api/products/view/productId/" + id);
  }

  public getMyOrders(): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8080/api/orders/view/myOrders");
  }

  public getMyCart(): Observable<MyCartDetails[]>{
    return this.httpClient.get<MyCartDetails[]>("http://localhost:8080/api/cart/miCarrito")
  }

  public setMyOrder(){
    return this.httpClient.post("http://localhost:8080/api/orders/order", {})
  }

  public getAllOrders(): Observable<AllOrderDetails[]>{
    return this.httpClient.get<AllOrderDetails[]>("http://localhost:8080/api/orders/viewAll")
  }

  public getUsers(){
    return this.httpClient.get<Users[]>("http://localhost:8080/getUsers")
  }

  public test(){
    return this.httpClient.get("http://localhost:8080/api/cart/precioMiCarrito")
  }

  public updateRole(){
    return this.httpClient.post("http://localhost:8080/editUserStatus", {})
  }

  public changePassword(password: FormData){
    return this.httpClient.post("http://localhost:8080/changePasswordRequest", password)
  }
}

