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

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit { 
  productDetails: Product[];
  displayedColumns = ['id', 'name', 'description', 'amountInStock', 'price', 'actions'];
  dataSource!:MatTableDataSource<any>;
  nameFilter = new FormControl('');

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;


  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private _snackBar: MatSnackBar){}

  ngOnInit(): void{
    this.getAllProducts();

  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))) 
    ).
    subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    )
  }
  
  deleteProduct(id: number){
    if(window.confirm("¿Estas seguro de eliminar este Producto?"))
    this.productService.deleteProduct(id).subscribe(
      (resp) => {
          this.getAllProducts();
          this._snackBar.open("El producto fue eliminado con exito", "", {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          console.log(resp);
      },
      (error:HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product){
    console.log(product);
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

  filterData($event: any){
    this.dataSource.filter = $event.target.value;
  }
}

