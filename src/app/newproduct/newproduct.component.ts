import { Component } from '@angular/core';
import { ProductserviceService } from '../_services/productservice.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {

  constructor(private axiosService: ProductserviceService){}


  addProduct(input:any):void{
    this.axiosService.request(
      "POST",
      "http://localhost:8080/api/products",
      {
        name: input.name,
        description: input.description,
        price: input.price,
        amountInStock: input.amountInStock,
        imageFile: input.imageFile
      }
    )
  }
}

