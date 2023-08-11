import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyCartDetails } from '../_model/cart.model';
import { ProductService } from '../_services/product.service';
import { Users } from '../_model/user.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  usersDetails: Users[] = [];
  displayedColumns = ['id', 'firstName', 'lastName',  'userEmail', 'userPhoneNumber', 'roles'];

  //Llamado al Servicio de Producto
  constructor(private productService: ProductService,
    private _snackBar: MatSnackBar){}

  //Llama la función que trae los detalles del carrito
  ngOnInit(): void{
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getUsers().subscribe(
      (resp: Users[]) => {
        console.log(resp);
        this.usersDetails = resp

      }, (error) => {
        console.log(error);
      }
    )
  }
}