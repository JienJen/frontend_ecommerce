import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ClassProduct } from 'src/app/_model/classProduct.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-clase-producto',
  templateUrl: './add-clase-producto.component.html',
  styleUrls: ['./add-clase-producto.component.css']
})
export class AddClaseProductoComponent {

  isNewProduct= true;

  classProduct : ClassProduct = {
    productClassId:null,
    name: "",
    imageFiles:[],
    description:"",
    category:"",
    price: 0,
    products: [],
  };
  id:number;
  selectedValue: string;

  categories = [
    {value: 'Vasos', viewValue: 'Vaso'},
    {value: 'Hoppie', viewValue: 'Hoppie'},
    {value: 'Tazas', viewValue: 'Taza'}
  ];


  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private http: HttpClient){ }

  ngOnInit():void{
    //Trae los datos del producto, en caso de que estemos editando
    this.classProduct = this.activatedRoute.snapshot.data['classProduct']
    if(this.classProduct && this.classProduct.productClassId){
      this.isNewProduct = false;
    }
  }
  

  //Añade los productos
  addProduct(classProductForm: NgForm){
    this.productService.addClassProduct(classProductForm.value).subscribe(
      (response: ClassProduct) => {
        console.log(response);
        classProductForm.reset();
        this._snackBar.open("Producto añadido correctamente", "", {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        
      }
    );
      },
      (error) =>{
        this._snackBar.open(error, "", {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
            }
          );
      }
    );
  }
}
