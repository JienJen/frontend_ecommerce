import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StringNullableChain } from 'lodash';
import { ProductService } from 'src/app/_services/product.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-edit-ruc',
  templateUrl: './edit-ruc.component.html',
  styleUrls: ['./edit-ruc.component.css']
})
export class EditRucComponent {

    constructor(private productService: ProductService,
      private userAuthService: UserAuthService,
      private activatedRoute: ActivatedRoute) {}
      
      datosUsuario : any
      editMode: boolean = false;
  
    ngOnInit(){
      this.productService.getUser().subscribe(
        (resp) =>{
          this.datosUsuario = resp;
        }
      );
    }

  editar(userRucForm: NgForm){
    
        this.productService.editUser(userRucForm.value).subscribe(
          (data : any) => {
            this.datosUsuario = data
            
          }
        )
    
  }
}
