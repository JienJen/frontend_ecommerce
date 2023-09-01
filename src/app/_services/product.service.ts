import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';
import { MyCartDetails } from '../_model/cart.model';
import { AllOrderDetails } from '../_model/allorders.model';
import { Users } from '../_model/user.model';
import { ClassProduct } from '../_model/classProduct.model';
import { ProductStock } from '../_model/productStock.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  // --------------------------VARIACION PRODUCTO--------------------------------- //

  //Añadir VARIACION de Producto
  public addProduct(productClassId: number, product: FormData){
    return this.httpClient.post<Product>("http://localhost:8080/api/products/createNew/" + productClassId, product);
  }

  //Get VARIACION de Producto
  //Para seleccionar a la hora de comprar
  public getProductDetailsById(id:any){
    return this.httpClient.get<ProductStock>("http://localhost:8080/api/products/view/productId/" + id);
  }

  public getVariationProductDetailsById(productClassId:any){
    return this.httpClient.get<Product[]>("http://localhost:8080/api/products/view/productByClass/" + productClassId);
  }

  public editVariationProduct(id : number, product : FormData){
    return this.httpClient.put<Product>("http://localhost:8080/api/products/edit/productId/" + id, product);
  }

 //Eliminar VARIACION de producto
 public deleteProduct(id: number){
  return this.httpClient.delete<string>("http://localhost:8080/api/products/delete/productId/" + id);
}
  // ------------------------------------------------------------------------- //









  // --------------------------CLASE PRODUCTO--------------------------------- //

  //Añadir CLASE de producto
  public addClassProduct(classProduct : ClassProduct): Observable<ClassProduct>{
    return this.httpClient.post<ClassProduct>("http://localhost:8080/api/products/createProductClass", classProduct)
  }

  //Get la CLASE de producto
  public getClassProductById(id: any){
    return this.httpClient.get<ClassProduct>("http://localhost:8080/api/products/view/Product/" + id);
  }

  //Ver LAS CLASES de producto
  public getProductClass(){
    return this.httpClient.get<ClassProduct[]>("http://localhost:8080/api/products/view/allProducts")
  }

  //Editar la CLASE de producto
  public editClassProduct(id: any, value : ClassProduct){
    return this.httpClient.put<ClassProduct>("http://localhost:8080/api/products/edit/productClassId/" + id, value)
  }

  public deleteClassProduct(id: number){
    return this.httpClient.delete<string>("http://localhost:8080/api/products/delete/productClassId/" + id);
  }


  // ------------------------------------------------------------------------- //



  //Ya no vamos a usar :( 
  public getAllProducts(classId:number){
    return this.httpClient.get<Product[]>("http://localhost:8080/api/products/view/productByClass/" + classId);
  }

 

  // --------------------------------- ORDENES ------------------------------------- //

  public setMyOrder(){
    return this.httpClient.post("http://localhost:8080/api/orders/order", {})
  }
  

  public getMyOrders(): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8080/api/orders/view/myOrders");
  }

  public getAllOrders(): Observable<AllOrderDetails[]>{
    return this.httpClient.get<AllOrderDetails[]>("http://localhost:8080/api/orders/viewAll")
  }

    // ------------------------------------------------------------------------- //








  // --------------------------------- CARRITO ------------------------------------- //
  
  public getMyCart(): Observable<MyCartDetails[]>{
    return this.httpClient.get<MyCartDetails[]>("http://localhost:8080/api/cart/miCarrito")
  }


  //precio total del carrito jeje
  public test(){
    return this.httpClient.get("http://localhost:8080/api/cart/precioMiCarrito")
  }
    // ------------------------------------------------------------------------- //

 




  public getUsers(){
    return this.httpClient.get<Users[]>("http://localhost:8080/getUsers")
  }

 

  public updateRole(){
    return this.httpClient.post("http://localhost:8080/editUserStatus", {})
  }

  public forgotPassword(password: FormData){
    return this.httpClient.post("http://localhost:8080/changePasswordRequest", password)
  }

  public facturar(orderId: number){
    return this.httpClient.get<string>("http://localhost:8080/api/JReport/facturar?orderId=" + orderId)
  }
  
  public getUser(){
    return this.httpClient.get("http://localhost:8080/getMyUser")
  }

  public editUser(postData : FormData){
    return this.httpClient.put("http://localhost:8080/editMyUser", postData)
  }

  public confirmarEmail(token: string){
    return this.httpClient.get("http://localhost:8080/changeEmail?token=" + token)
  }

  
  public cambiarEmail(dto: FormData){
    return this.httpClient.post("http://localhost:8080/changeEmailRequest", dto)
  }


  public confirmar(token: string){
    return this.httpClient.get("http://localhost:8080/confirmar?token=" + token)
  }


}

