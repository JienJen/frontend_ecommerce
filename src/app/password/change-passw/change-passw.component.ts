import { Component, OnInit } from '@angular/core';
import { _closeDialogVia } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { changePasswModel } from 'src/app/_model/changePassw.model';
import { passwModel } from 'src/app/_model/password.model';
import { EmailPasswordService } from 'src/app/_services/email-password.service';

@Component({
  selector: 'app-change-passw',
  templateUrl: './change-passw.component.html',
  styleUrls: ['./change-passw.component.css']
})
export class ChangePasswComponent implements OnInit {
  
  oldPassword: string;
  password: string;
  repeatPassword: string;

  pass: changePasswModel
  

  constructor( private emailPasswService: EmailPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
  }

  changePassw() : void {
    if(this.password !== this.repeatPassword){
      this._snackBar.open("Las contraseñas no coinciden", "", {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
      return;
    }
    this.pass = new changePasswModel(this.oldPassword, this.password, this.repeatPassword)
    this.emailPasswService.changePasswLogged(this.pass).subscribe(
      (resp: any) => {
        console.log(resp)
        this._snackBar.open("Contraseña cambiada con exito", "", {
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
