import { Component } from '@angular/core';
import { MyCartDetails } from '../_model/cart.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-my-cart-items',
  templateUrl: './my-cart-items.component.html',
  styleUrls: ['./my-cart-items.component.css']
})
export class MyCartItemsComponent {
  myCartDetails: MyCartDetails[] = [];
  displayedColumns = ['idProducto', 'nombreProducto', 'cantidadProducto',  'precioProducto','estadoProducto'];


  constructor(private productService: ProductService,
    ){}

  ngOnInit(): void{
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getMyCart().subscribe(
      (resp: MyCartDetails[]) => {
        console.log(resp);
        this.myCartDetails = resp;
      }, (error: any) => {
        console.log(error);
      }
    )
  }
}