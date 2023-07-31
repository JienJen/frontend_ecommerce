import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent { 
  productDetails: Product[] = [];
  displayedColumns = ['idOrden', 'idUser', 'userFirstName', 'userLastName','description', 'direction', 'amountInStock', 'price'];


  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router){}

  ngOnInit(): void{

  }

 
}