import { Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Products } from '../_model/product.model';
import { AxiosService } from '../_services/axios.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent { 

  productDetails: Products[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'amount_in_stock'];
  

  constructor(private axiosService:AxiosService) {}



}
