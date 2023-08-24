import {  Component, 
          ContentChild, 
          Directive, 
          Input, OnInit, 
          TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs/operators'
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productDetails: Product[] = [];
  obs: Observable<any>;
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.getAllProducts();

  }

  //Función que trae los productos del Servicio de Productos
  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))) 
    ).
    subscribe(
      (resp: Product[]) => {
        this.dataSource = new MatTableDataSource<Product>(resp)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;


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



  //Redirige a la página con los detalles correspondientes del producto de acuerdo a su Id/Codigo
  showProductDetails(id:number){
    
    this.router.navigate(['/Producto', {id:id},]);
    
  }

}

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override firstPageLabel = 'Primera Página';
  override nextPageLabel     = 'Página Siguiente';
  override previousPageLabel = 'Página Anterior';
  override lastPageLabel = 'Última Página';
}