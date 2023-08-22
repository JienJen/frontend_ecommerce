import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  login: string = "";

  constructor(private userService: ProductService,
    private _snackBar: MatSnackBar
    ) {
    
  }
  
  
  changePass(passwordForm:NgForm){
   this.userService.forgotPassword(passwordForm.value).subscribe(
    (resp :any) =>{
      this._snackBar.open("Email enviado", "", {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      
        })
    },
    (error) =>{
      console.log(error);
      this._snackBar.open(error, "", {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      
        }
      );
    }
  )}
}

