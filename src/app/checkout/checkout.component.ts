import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(   public httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute) {}
    
  myOrderDetails: MyOrderDetails[] = [];
  selectedValue: string;
  product: Product;
  direccion : string = "";
  detalles: string ="";
  p : any 

  methods = [
    {value: 'efectivo-0', viewValue: 'Efectivo'},
    {value: 'credito-1', viewValue: 'Tarjeta - QR'},
  ];

  ngOnInit(): void {
    this.httpClient.get<any>("http://localhost:8080/api/cart/precioMiCarrito").subscribe(data=> {
      this.p = data;
    })

        

  }

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
