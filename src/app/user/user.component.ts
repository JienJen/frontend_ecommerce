import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

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
 

    ngOnInit(){
try{
  this.datosUsuario = JSON.parse(localStorage.getItem('user') || '{}')
  console.log(this.datosUsuario)

}catch(error){}
      
      
    }


  
}
