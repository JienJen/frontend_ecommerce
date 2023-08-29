import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Users } from '../../_model/user.model';
import { UserAuthService } from '../../_services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private productService: ProductService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,

    ){ }
    datosUsuario : any
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
}
