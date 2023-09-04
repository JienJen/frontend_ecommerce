import { Component, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { ProductService } from '../../_services/product.service';
import { AllOrderDetails } from '../../_model/allorders.model';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent { 
  allOrderDetails: AllOrderDetails[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource:MatTableDataSource<AllOrderDetails>;
  obs: Observable<any>;
  orderStatus: string;
  apiResponse: any = [];
  
  //Las columnas desplazadas en la tabla
  displayedColumns = [  'userFirstName','userPhoneNumber', 'userAddress', 'orderDescription', 'cartItemsproductId', 'cartItemsproductName', 'cartItemsamount', 'cartItemsprice', 'totalPrice', 'orderStatus'];

  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    private _snackBar: MatSnackBar
    ){}


  //Llama la función que trae los detalles de las ordenes
  ngOnInit(): void{
    this.productService.getAllOrders().subscribe(
      (resp: AllOrderDetails[]) => {
        this.apiResponse = resp;
        this.dataSource = new MatTableDataSource<AllOrderDetails>(resp);
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        }
      );      }
    )
  }

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

  filterData(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }

   

}