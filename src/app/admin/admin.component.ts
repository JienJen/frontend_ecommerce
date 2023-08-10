import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private productService: ProductService,
    ){}
  prueba(){
    this.productService.test().subscribe(
      (resp) => {
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    )
  }

}
