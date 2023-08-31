import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ClassProduct } from 'src/app/_model/classProduct.model';
import { ProductService } from 'src/app/_services/product.service';
import { DialogAddVariacionComponent } from '../../Variacionproductos/dialog-add-variacion/dialog-add-variacion.component';

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
    public variationDialog: MatDialog){ }

  ngOnInit():void{
    //Trae los datos del producto, en caso de que estemos editando
    this.classProduct = this.activatedRoute.snapshot.data['classProduct']
    if(this.classProduct && this.classProduct.productClassId){
      this.isNewProduct = false;
    }
  }
  

  //Añade los productos
  addProduct(classProductForm: NgForm){
    var classId;

    this.productService.addClassProduct(classProductForm.value).subscribe(
      (response: ClassProduct) => {
        classId = response["productClassId"]
        console.log(response);
        classProductForm.reset();
        this._snackBar.open("Producto añadido correctamente", "", {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      }
    );
    const dialogConfig = new MatDialogConfig();

        dialogConfig.data = {
          productClassId : classId
        }
        dialogConfig.height = '300px'
        dialogConfig.width = '1200px'
        dialogConfig.disableClose = true

        this.variationDialog.open(DialogAddVariacionComponent, dialogConfig )
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

  editProduct(classProductForm : NgForm){
    const id = this.classProduct.productClassId
    this.productService.editClassProduct(id, classProductForm.value).subscribe(
      (response: ClassProduct) => {
        console.log(response)
        this._snackBar.open("Producto actualizado correctamente", "", {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      }
    );
    
    setTimeout(function(){window.location.href = "/DetallesClaseProducto"}, 1000);
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