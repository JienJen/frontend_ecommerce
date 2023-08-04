import { Component } from '@angular/core';
import { MyCartDetails } from '../_model/cart.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-my-cart-items',
  templateUrl: './my-cart-items.component.html',
  styleUrls: ['./my-cart-items.component.css']
})
export class MyCartItemsComponent {
  myCartDetails: MyCartDetails[] = [];

  //Las columnas desplazadas en la tabla
  displayedColumns = ['idProducto', 'nombreProducto', 'cantidadProducto',  'precioProducto'];

  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    ){}

  //Llama la función que trae los detalles del carrito
  ngOnInit(): void{
    this.getCartDetails();
  }


  //Llama la función de traer el carrito del servicio del Producto.
  getCartDetails(){
    this.productService.getMyCart().subscribe(
      (resp: MyCartDetails[]) => {
        console.log(resp);
        this.myCartDetails = resp;
      }, (error: any) => {
        console.log(error);
      }
    )
  }
}