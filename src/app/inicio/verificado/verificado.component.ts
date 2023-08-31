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



    ngOnInit(): void {
      this.token = this.activatedRoute.snapshot.params['token'];
      this.emailService.confirmar(this.token).subscribe(
        (resp) => {
         
        },
        (error) => {
          console.log(error)
          this._snackBar.open(error, "", {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          
        }
      );
        }
      )
      this._snackBar.open("Usuario Verificado!", "", {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    }
  );
      window.location.href = "/Inicio"
    }
}
