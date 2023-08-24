import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../_services/product.service';
import { Users } from '../_model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  usersDetails: Users[] = [];
  displayedColumns = ['id', 'firstName', 'lastName',  'userEmail', 'userPhoneNumber', 'roles'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource:MatTableDataSource<Users>;
  obs: Observable<any>;
  orderStatus: string;
  apiResponse: any = [];
  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    private _snackBar: MatSnackBar){}

  //Llama la función que trae los detalles del carrito
  ngOnInit(): void{
    this.productService.getUsers().subscribe(
      (resp: Users[]) => {
        this.apiResponse = resp;
        this.dataSource = new MatTableDataSource<Users>(resp);
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );      }
    )

  }
 

  selectStage($event : any){
    if($event.value.toLowerCase() == "all"){
      this.dataSource = new MatTableDataSource(this.apiResponse)

    } else {
      let filteredData = _.filter(this.apiResponse, (item: any) =>{
      return item.roles[0].toLowerCase() == $event.value.toLowerCase();
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