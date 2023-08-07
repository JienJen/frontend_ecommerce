import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(   public httpClient: HttpClient,
    private _snackBar: MatSnackBar ) {}

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
        this._snackBar.open("Se efectúo correctamente la compra", "", {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      }
    );
        setTimeout(function(){window.location.href = "/MisOrdenes"}, 3000);
      },
      (error) => {
      console.log(error)
      this._snackBar.open(error, "", {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
          }
        );
      }   
    )
  }
}
