import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Users } from '../_model/user.model';
import { UserAuthService } from '../_services/user-auth.service';
import { ActivatedRoute } from '@angular/router';

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
    datosUsuario : any;
 

    ngOnInit(){
try{
  this.datosUsuario = JSON.parse(localStorage.getItem('user') || '{}')

}catch(error){}
      
      
    }


  




}
