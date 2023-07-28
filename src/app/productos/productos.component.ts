import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs/operators'
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productDetails: Product[] = [];


  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService){}

  ngOnInit(): void {
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
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    )
  }


}
