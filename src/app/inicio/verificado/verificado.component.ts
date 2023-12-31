import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailPasswordService } from 'src/app/_services/email-password.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-verificado',
  templateUrl: './verificado.component.html',
  styleUrls: ['./verificado.component.css']
})
export class VerificadoComponent implements OnInit{
  token: string;

  constructor( private emailService: ProductService,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {}


    mensaje : string

    ngOnInit(): void {
      this.token = this.activatedRoute.snapshot.params['token'];
      this.emailService.confirmar(this.token).subscribe(
        (resp) => {
          this._snackBar.open(Object.values(resp)[0], "", {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
        }
      );
        },
        (error) => {
          this._snackBar.open(
            "El token ya ha expirado. Hemos enviado un nuevo Link de Verificación al Correo.", "", {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          }
      );
        this.emailService.newToken(this.token).subscribe()
        }
      )
    }
}
