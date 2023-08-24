import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyOrderDetails } from '../_model/order.model';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.css']
})
export class FacturarComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private productService: ProductService,
  private _snackBar: MatSnackBar,
  private userAuthService: UserAuthService,
  ){}

  orderDetail : MyOrderDetails
  datosOrden : any;
  order : number;
  orders= [];
  
  

  ngOnInit(){
    console.log(Object.values(this.data))
  }

  factura(order : number){
    
    this.orders = (Object.values(this.data))
    console.log(this.orders[0])

    
    this.productService.facturar(this.orders[0]).subscribe(
      (resp) => {
        console.log(resp)
          this._snackBar.open("La factura ha sido enviada a tu correo", "", {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
      },
      (error) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      )
    })
  }
}
