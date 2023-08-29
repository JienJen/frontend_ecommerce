import { Injectable } from '@angular/core';
import { ClassProduct } from '../_model/classProduct.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';
import { ClassImageProcessingService } from './class-image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ClassProductResolveService implements Resolve<ClassProduct>{

  constructor(private productService : ProductService,
    private classImageProcessingService: ClassImageProcessingService) { }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<ClassProduct>{
    const id = route.paramMap.get("productClassId");

    if (id){
      return this.productService.getClassProductById(id).pipe(
        map(p => this.classImageProcessingService.createImages(p))
      );
    } else {
      return of(this.getVariationDetails())
    }
  }

  getVariationDetails(){
    return {
      productClassId:null,
      name: "",
      imageFiles:[],
      description: "",
      category: "",
      price: 0,
      products:[]
    }
  }
}
