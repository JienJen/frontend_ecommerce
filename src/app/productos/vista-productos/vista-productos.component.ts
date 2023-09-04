import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ClassProduct } from 'src/app/_model/classProduct.model';
import { ClassImageProcessingService } from 'src/app/_services/class-image-processing.service';
import { ImageProcessingService } from 'src/app/_services/image-processing.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-vista-productos',
  templateUrl: './vista-productos.component.html',
  styleUrls: ['./vista-productos.component.css']
})
export class VistaProductosComponent implements OnInit {
  classProductsDetails: ClassProduct[] = [];

  obs: Observable<any>;
  dataSource: MatTableDataSource<ClassProduct>;
  classId:number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private productService: ProductService,
    private classImageProcessingService: ClassImageProcessingService,
    private router: Router,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    
    this.getAllProductsClass();
  }

  //Función que trae los productos del Servicio de Productos
  classProduct: ClassProduct[] = [];
  public getAllProductsClass(){
    this.productService.getProductClass().pipe(
      map((x: ClassProduct[], i) => x.map((product: ClassProduct) => this.classImageProcessingService.createImages(product))) 
    ).subscribe(
      (resp: ClassProduct[]) => {
        console.log(resp)
        this.dataSource = new MatTableDataSource<ClassProduct>(resp)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;
      },
      (error) =>{
        this._snackBar.open(error, "", {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      }
    );   
      }
    )
  }

  //Redirige a la página con los detalles correspondientes del producto de acuerdo a su Id/Codigo
  showProductDetails(productClassId:number){
    this.router.navigate(['/Producto', {productClassId: productClassId}]);
  }

}

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override firstPageLabel = 'Primera Página';
  override nextPageLabel     = 'Página Siguiente';
  override previousPageLabel = 'Página Anterior';
  override lastPageLabel = 'Última Página';
}