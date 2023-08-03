import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { MyOrderDetails } from '../_model/order.model';
import { AllOrderDetails } from '../_model/allorders.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent { 
  allOrderDetails: AllOrderDetails[] = [];
  displayedColumns = [ 'orderId','idUser', 'userFirstName','userPhoneNumber', 'userAddress', 'orderDescription', 'cartItemsproductId', 'cartItemsproductName', 'cartItemsamount', 'cartItemsprice', 'totalPrice', 'orderStatus'];


  constructor(private productService: ProductService,
    ){}

  ngOnInit(): void{
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getAllOrders().subscribe(
      (resp: AllOrderDetails[]) => {
        console.log(resp);
        this.allOrderDetails = resp;
      }, (error) => {
        console.log(error);
      }
    )
  }
 
}