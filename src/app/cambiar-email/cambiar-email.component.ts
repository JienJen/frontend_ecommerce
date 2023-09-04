import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { changePasswModel } from '../_model/changePassw.model';
import { EmailPasswordService } from '../_services/email-password.service';
import { ProductService } from '../_services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cambiar-email',
  templateUrl: './cambiar-email.component.html',
  styleUrls: ['./cambiar-email.component.css']
})
export class CambiarEmailComponent implements OnInit {
  
  userEmail : string;
  

  constructor( private emailPasswService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
  }

  changeEmail(changedEmail : NgForm) : void {
    this.emailPasswService.cambiarEmail(changedEmail.value).subscribe(
      (resp: any) => {
        console.log(resp)
        this._snackBar.open("Verifica tu Email para validar el cambio", "", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        }
        );
      },
      (error) =>{
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        }
      );
    });
  }
}
