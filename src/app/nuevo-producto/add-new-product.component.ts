import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{

  isNewProduct= true;

  product: Product = {
    id: null,
    name: "",
    description: "",
    category: "",
    amountInStock: 0,
    price: 0,
    imageFiles: []
  }
  selectedValue: string;

  categories = [
    {value: 'interior-0', viewValue: 'Interior'},
    {value: 'exterior-1', viewValue: 'Exterior'},
  ];


  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar){ }

  ngOnInit():void{
    //Trae los datos del producto, en caso de que estemos editando
    this.product = this.activatedRoute.snapshot.data['product']

    if(this.product && this.product.id){
      this.isNewProduct = false;
    }
  }
  

  //Añade los productos
  addProduct(productForm: NgForm){

    const productFormData = this.prepareFormData(this.product)

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.imageFiles = [];
        (response);
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

  editProduct(productForm: NgForm){

    const productFormData = this.prepareFormData(this.product)

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        this.product.imageFiles = [];
        this._snackBar.open("Producto actualizado correctamente", "", {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        
      }
    );
    
    setTimeout(function(){window.location.href = "/DetallesProductos"}, 1000);
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


  //Prepara los datos, ya que estamos recibiendo archivos tipo json y tipo img
  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type:'application/json'})
    );
    
    for(var i = 0; i < this.product.imageFiles.length; i++){
      formData.append(
        'imageFile',
        this.product.imageFiles[i].file,
        this.product.imageFiles[i].file.name
      );
    }

    return formData;
  }


  onFileSelected(event: any){
      if(event.target.files){
        const file = event.target.files[0];

        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }
        
        this.product.imageFiles.push(fileHandle); 
        

      }
    }


  removeimages(i:number){
      this.product.imageFiles.splice(i, 1);

    }

}
