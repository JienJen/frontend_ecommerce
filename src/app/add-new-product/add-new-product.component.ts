import { Component } from '@angular/core';
import { Products } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AxiosService } from '../_services/axios.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {

  name: string = "";
  description: string = "";
  price: number = 0;
  amountInStock: number = 0

  constructor(private axiosService: AxiosService) {}

  addProduct(input: any):void {
   this.axiosService.request(
      "POST",
      "/register",
      {
        name: input.name,
        description: input.description,
        price: input.price,
        amountInStock : input.amountInStock
       
      }
    )
  }
}
