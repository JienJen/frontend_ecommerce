import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(   public httpClient: HttpClient ) {}

  selectedValue: string;
  product: Product;
  direccion : string = "";
  detalles: string ="";

  methods = [
    {value: 'efectivo-0', viewValue: 'Efectivo'},
    {value: 'credito-1', viewValue: 'Tarjeta - QR'},
  ];


  public addToOrder(){
    let orderPayment = this.selectedValue;
    let orderAddress = this.direccion ;
    let orderDesc = this.detalles;

    const transferObject = {
      paymentMethod : orderPayment,
      userAddress : orderAddress,
      orderDescription: orderDesc
    }

    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

    const object = JSON.stringify(transferObject);

    return this.httpClient.post("http://localhost:8080/api/orders/order", object, {headers: header}).subscribe(
      (resp) => {
        console.log(resp)
        window.location.href = "/MisOrdenes"
      },
      (error) => {
      console.log(error)
    }   )
    
  }
}
