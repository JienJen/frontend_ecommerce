import { Component } from '@angular/core';
import { MyCartDetails } from '../../../_model/cart.model';
import { ProductService } from '../../../_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar

    ){}

  //Llama la función que trae los detalles del carrito
  ngOnInit(): void{
    this.getCartDetails();
  }


  //Llama la función de traer el carrito del servicio del Producto.
  getCartDetails(){
    this.productService.getMyCart().subscribe(
      (resp: MyCartDetails[]) => {
        this.myCartDetails = resp;
      }, (error: any) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );      }
    )
  }
}