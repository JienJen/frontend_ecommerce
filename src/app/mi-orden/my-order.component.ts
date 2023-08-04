import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { cartItems } from '../_model/cartItems.model';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  myOrderDetails: MyOrderDetails[] = [];
  cartItems: cartItems[] = [];
  displayedColumns: string[] = [ 'cartItemsproductId', 'cartItemsproductName' , 'cartItemsamount', 'cartItemsprice', 'totalPrice', 'orderStatus' ];
  
  
  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    ){}

  //Llama la función que trae los detalles de las ordenes del usuario
  ngOnInit(): void{
    this.getOrderDetails();
  }

  //Llama la función de traer los detalles de ordenes de un usuario del servicio del Producto.
  getOrderDetails(){
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      }, (error) => {
        console.log(error);
      }
    )
  }
 
}