import { Component } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private productService: ProductService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,

    ){ }
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
}