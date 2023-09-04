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
  displayedColumns = ['idProducto', 'nombreProducto', 'cantidadProducto',  'precioProducto', 'acciones'];

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
        console.log(resp)
      }, (error: any) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        }
      );      }
    )
  }

  deleteProducts(itemId: number){
      this.productService.deleteCart(itemId).subscribe(
        (resp) => {
          console.log(resp)
            this._snackBar.open("El producto fue eliminado con exito", "", {
              duration: 1500,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            })
            window.location.reload()
          },
        (error) => {
          this._snackBar.open(error, "", {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          }
        );      }
      ); 
    }
}