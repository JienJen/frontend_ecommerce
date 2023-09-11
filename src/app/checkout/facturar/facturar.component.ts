import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../../_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyOrderDetails } from '../../_model/order.model';
import { UserAuthService } from '../../_services/user-auth.service';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { end } from '@popperjs/core';
import { EditRucComponent } from 'src/app/Users/edit-ruc/edit-ruc.component';

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
  public imagesDialog: MatDialog) {}

  orderDetail : MyOrderDetails
  datosOrden : any;
  order : number;
  orders= [];
  
  

  ngOnInit(){
  }

  factura(order : number){
    this.productService.getUser().subscribe(
      (respo) => {
        console.log(respo)
        if (Object.values(respo)[5] == null || Object.values(respo)[5] == " " || Object.values(respo)[5] == "")
        {
          console.log("hi")
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            orderId : order
          }
          dialogConfig.height = '484.18'
          dialogConfig.width = '334.4'
          dialogConfig.disableClose = true
          
          this.imagesDialog.open(EditRucComponent, dialogConfig);
        } else {
          this.orders = (Object.values(this.data))
          this.productService.facturar(this.orders[0]).subscribe(
          (resp) => {
          console.log(resp)
          this._snackBar.open("La factura ha sido enviada a tu correo", "", {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'app-notification-success'

          })
          },
          (error) => {
            this._snackBar.open(error, "", {
              duration: 1500,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'app-notification-error'
            }
          )
        })
        }
      }
    )
  }
}
