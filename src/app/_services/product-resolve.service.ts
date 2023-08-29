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
      return this.productService.getVariationProductDetailsById(id)
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
      amountInStock: 0,
      imageFiles: [],
      color: "",
      productClassId: null
    }
  }
}
