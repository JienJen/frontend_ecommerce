import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-verificado-email',
  templateUrl: './verificado-email.component.html',
  styleUrls: ['./verificado-email.component.css']
})
export class VerificadoEmailComponent  implements OnInit{
  token: string;

  constructor( private emailService: ProductService,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {}



    ngOnInit(): void {
      this.token = this.activatedRoute.snapshot.params['token'];
      this.emailService.confirmarEmail(this.token).subscribe(
        (resp) => {
        },
        (error) => {
          console.log(error)
          this._snackBar.open(error, "", {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          
        }
      );
        }
      )
      this._snackBar.open("Email Verificado!", "", {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'app-notification-success',
      }
  );
      window.location.href = "/Inicio"
    }
}
