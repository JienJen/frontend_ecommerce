import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from '../_services/user-service.service';

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
    public httpClient: HttpClient,
    public userService: UserServiceService,
    private router: Router) { }

  //Valor predeterminado del Input -- Cantidad para añadir al carrito
  inputText : string = "1"

  ngOnInit(): void {
    //Llama los datos del producto
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(index: number){
    //Al hacer click por las imagenes pequeñas del grid, cambia el valor del index de la imagen grande, trayendo asi la img que se clickeo
    this.selectedProductIndex = index;
  }

  //Funcion para añadir al carrito
  public addToCart(){
    //Agarra el id del producto
    let cartProductId = this.product.id;
    //Agarra la cantidad a comprar segun el input
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

  editProductDetails(id: number){
    this.router.navigate(['/AñadirProducto', {id: id}]);
  }
}
