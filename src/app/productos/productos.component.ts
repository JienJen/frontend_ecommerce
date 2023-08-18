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
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';




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
    private router: Router){}

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
        console.log(resp);
        this.dataSource = new MatTableDataSource<Product>(resp)
        this.obs = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;


      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    )
  }



  //Redirige a la página con los detalles correspondientes del producto de acuerdo a su Id/Codigo
  showProductDetails(id:number){
    
    this.router.navigate(['/Producto', {id:id},]);
    
  }

}

