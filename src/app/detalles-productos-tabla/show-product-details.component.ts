import { Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../detalles-productos-imagenes/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit { 
  productDetails: Product[];
  displayedColumns = ['id', 'name', 'description', 'category', 'amountInStock', 'price', 'actions'];
  dataSource!:MatTableDataSource<any>;
  nameFilter = new FormControl('');
  apiResponse: any = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  filterValues = {
    name: '',
  };

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private _snackBar: MatSnackBar,
    ){}

  ngOnInit(): void{
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))) 
    ).
    subscribe(
      (resp: Product[]) => {
        this.apiResponse = resp;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData;
      },
      (error) =>{
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
      return item.orderStatus.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData)
    }
    this.dataSource.paginator = this.paginator;

  }

  public getAllProducts(){
   
  }
  
  deleteProducts(id: number){
    if(window.confirm("¿Estas seguro de eliminar este Producto?"))
    this.productService.deleteProduct(id).subscribe(
      (resp) => {
          this.getAllProducts();
          this._snackBar.open("El producto fue eliminado con exito", "", {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
      },
      (error) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );      }
    );
  }

  showImages(product: Product){
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data:{
        images: product.imageFiles
      },
      height: '500px',
      width: '800px',
    }); 
  }
  
  editProductDetails(id: number){
    this.router.navigate(['/AñadirProducto', {id: id}]);
  }

  filterData(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(){

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }
}

