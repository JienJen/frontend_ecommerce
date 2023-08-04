import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyCartDetails } from '../_model/cart.model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent {
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
      }, (error) => {
        console.log(error);
      }
    )
  }
  
  emptyMessage: any;

  emptyClause(array: MyCartDetails[]) {


    if (array.length === 0) {
        // array empty or does not exist

        this.emptyMessage=false;

}else{

        this.emptyMessage=true;
    }
}

  /*
  sendOrder(){
    this.productService.setMyOrder().subscribe(
      (resp) => {
        console.log(resp);
        window.location.reload();
      }, (error) =>{
        console.log(error);
      }
    )
  }
  */
}