import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService : ProductService,
    private imageProcessingService: ImageProcessingService) { }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<Product>{
    const id = route.paramMap.get("id");

    if (id) {
      return this.productService.getProductDetailsById(id)
      .pipe(
        map(p => this.imageProcessingService.createImages(p))
      );
    } else {
      return  of(this.getProductDetails()) ;
    }
  }

  getProductDetails(){
    return {
      id:null,
      name: "",
      description: "",
      amountInStock: 0,
      price: 0,
      imageFiles: []
    }
  }
}
