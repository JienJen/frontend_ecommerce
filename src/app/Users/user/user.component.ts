import { Component } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswComponent } from 'src/app/password/change-passw/change-passw.component';
import { CambiarEmailComponent } from 'src/app/cambiar-email/cambiar-email.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private productService: ProductService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    public passDialog: MatDialog,
    public emailDialog: MatDialog) {}
    
    datosUsuario : any;
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
  
  editar(userForm: NgForm){
    this.productService.editUser(userForm.value).subscribe(
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