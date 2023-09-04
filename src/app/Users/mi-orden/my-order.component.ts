import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../../_model/product.model';
import { ImageProcessingService } from '../../_services/image-processing.service';
import { ProductService } from '../../_services/product.service';
import { MyOrderDetails } from '../../_model/order.model';
import { cartItems } from '../../_model/cartItems.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import * as _ from 'lodash';


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  myOrderDetails: MyOrderDetails[] = [];
  cartItems: cartItems[] = [];
  displayedColumns: string[] = [ 'cartItemsproductId', 'cartItemsproductName' , 'cartItemsamount', 'cartItemsprice', 'totalPrice', 'orderStatus' ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource:MatTableDataSource<MyOrderDetails>;
  obs: Observable<any>;
  orderStatus: string;
  apiResponse: any = [];
  
  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    private _snackBar: MatSnackBar){}

  //Llama la función que trae los detalles de las ordenes del usuario
  ngOnInit(): void{
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        this.apiResponse = resp;
        this.dataSource = new MatTableDataSource<MyOrderDetails>(resp);
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        this._snackBar.open(error, "", {
          duration: 2500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        }
          );
      }
    )  }

  //Llama la función de traer los detalles de ordenes de un usuario del servicio del Producto.

  selectStage($event : any){
    if($event.value.toLowerCase() == "all"){
      this.dataSource = new MatTableDataSource(this.apiResponse)

    } else {
      let filteredData = _.filter(this.apiResponse, (item: any) =>{
      return item.orderStatus.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData)
    }
    this.dataSource.paginator = this.paginator;

  }

}