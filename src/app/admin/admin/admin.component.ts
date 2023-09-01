import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Users } from '../../_model/user.model';
import { UserAuthService } from '../../_services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswComponent } from 'src/app/password/change-passw/change-passw.component';
import { CambiarEmailComponent } from 'src/app/cambiar-email/cambiar-email.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private productService: ProductService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    public passDialog: MatDialog) {}


    datosUsuario : any = {
      firstname: "",
    }
    editMode: boolean = false;

    ngOnInit(){
      this.productService.getUser().subscribe(
        (resp) =>{
          this.datosUsuario = resp;
        }
      );
    }

    cambiarEditar(){
      this.editMode = true
    }
    
    editar(adminForm: NgForm){
      this.productService.editUser(adminForm.value).subscribe(
        (data:any ) => {
          this.datosUsuario = data;
        }
      )
      this.editMode = false
    }

    changepass(){

      const dialogConfig = new MatDialogConfig();
      
      dialogConfig.height = '500px'
      dialogConfig.width = '400px'

      this.passDialog.open( ChangePasswComponent, dialogConfig )
      
    }

    changeEmail(){

      const dialogConfig = new MatDialogConfig();
      
      dialogConfig.height = '350px'
      dialogConfig.width = '400px'
  
      this.passDialog.open( CambiarEmailComponent, dialogConfig )
      
    }
}
