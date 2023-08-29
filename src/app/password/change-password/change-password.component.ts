import { Component, OnInit } from '@angular/core';
import { passwModel } from '../../_model/password.model';
import { EmailPasswordService } from '../../_services/email-password.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  password: string;
  repeatPassword: string;
  token: string;

  pass: passwModel
  
  active: string = "change";

  onRegisterTab(): void {
		this.active = "register";
	}

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
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }
    this.token = this.activatedRoute.snapshot.params['token'];
    this.pass = new passwModel(this.password, this.repeatPassword, this.token)
    this.emailPasswService.changePassword(this.pass).subscribe(
      (resp: any) =>{
        this._snackBar.open("Contraseña cambiada con exito", "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
        );
      },
      (error) =>{
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
    }
  )}
}
