import { Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { AxiosService } from '../_services/axios.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent { 

  productDetails: Product[] = [];
  displayedColumns: string[] = ['id', 'Nombre del Producto', ' Descripción del Producto', 'Precio'];

  constructor(private axiosService:AxiosService) {}



}
