import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyCartDetails } from '../_model/cart.model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent {
  myCartDetails: MyCartDetails[] = [];
  displayedColumns = ['idProducto', 'nombreProducto', 'cantidadProducto',  'precioProducto','estadoProducto'];

  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    ){}

  //Llama la función que trae los detalles del carrito
  ngOnInit(): void{
    this.getCartDetails();
  }

  //Llama la función de traer los detalles de mi carrito del servicio del Producto.
  getCartDetails(){
    this.productService.getMyCart().subscribe(
      (resp: MyCartDetails[]) => {
        console.log(resp);
        this.myCartDetails = resp;
      }, (error) => {
        console.log(error);
      }
    )
  }
}