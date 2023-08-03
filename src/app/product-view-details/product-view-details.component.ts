import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  
  selectedProductIndex = 0;
  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public httpClient: HttpClient) { }


  inputText : string = "1"

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(index: number){
    this.selectedProductIndex = index;
  }

  
  public addToCart(){
    let cartProductId = this.product.id;
    let cartProductAmount = this.inputText;

    const transferObject = {
      productId : cartProductId,
      amount : cartProductAmount
    }

    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

    const object = JSON.stringify(transferObject);

    return this.httpClient.post("http://localhost:8080/api/products/addToCart", object, {headers: header}).subscribe(
      (resp) => {
        console.log(resp)
        window.location.reload();
      },
      (error) => {
      console.log(error)
    }   )
    
  }
}
