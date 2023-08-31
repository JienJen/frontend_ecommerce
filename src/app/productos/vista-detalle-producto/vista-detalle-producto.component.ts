import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassProduct } from 'src/app/_model/classProduct.model';
import { Product } from 'src/app/_model/product.model';
import { ProductStock } from 'src/app/_model/productStock.model';
import { ProductService } from 'src/app/_services/product.service';
import { UserServiceService } from 'src/app/_services/user-service.service';

@Component({
  selector: 'app-vista-detalle-producto',
  templateUrl: './vista-detalle-producto.component.html',
  styleUrls: ['./vista-detalle-producto.component.css']
})
export class VistaDetalleProductoComponent implements OnInit{
  
  selectedProductIndex = 0;
  selectedProductIndex2 = 0;
  product: Product[];
  products: ProductStock;
  classProduct: ClassProduct;
  id:number;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public httpClient: HttpClient,
    public userService: UserServiceService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  //Valor predeterminado del Input -- Cantidad para añadir al carrito
  inputText : string = "1"

  ngOnInit(): void {
    //Llama los datos del producto
    this.classProduct = this.activatedRoute.snapshot.data['classProduct'];

    this.productService.getVariationProductDetailsById(this.classProduct.productClassId).subscribe(
      (resp) => {
        this.product = resp;
        console.log(resp)
      }
    )
  }

  changeIndex(index: number){
    //Al hacer click por las imagenes pequeñas del grid, cambia el valor del index de la imagen grande, trayendo asi la img que se clickeo
    this.selectedProductIndex = index;
  }

  changeIndex2(index2: number){
    this.selectedProductIndex2 = index2;
    this.productService.getProductDetailsById(this.product[this.selectedProductIndex2].id).subscribe(
      (resp) => {
        this.products = resp
        console.log(this.products)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  public addToCart(){
    //Agarra el id del producto
    let cartProductId = this.products.id;
    let cartProductAmount = this.inputText;

    const transferObject = {
      productId : cartProductId,
      amount : cartProductAmount
    }
    
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

    const object = JSON.stringify(transferObject);

    return this.httpClient.post("http://localhost:8080/api/products/addToCart", object, {headers: header}).subscribe(
      (resp) => {
        this._snackBar.open("Se añadio correctamente al carrito", "", {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        
      }
    );
        this.inputText = "1"
      },
      (error) => {
      this._snackBar.open(error, "", {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
          }
        );
      }   
    )
  }
  

  editProductDetails(id: number){
    this.router.navigate(['/AñadirProducto', {id: id}]);
  }
}
