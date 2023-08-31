import { Component,Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from '../../ClaseProductos/tabla-clase-producto/tabla-clase-producto.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-variacion',
  templateUrl: './dialog-add-variacion.component.html',
  styleUrls: ['./dialog-add-variacion.component.css']
})
export class DialogAddVariacionComponent implements OnInit{

  isNewProduct= true;

  product: Product = {
    id: null,
    amountInStock: 0,
    color: "",
    imageFiles: [],
    productClassId: null
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar){ 
    }

  ngOnInit():void{
    //Trae los datos del producto, en caso de que estemos editando
    console.log(this.data)

  }
  

  //Añade los productos
  addProduct(productForm: NgForm){
    var Id = this.data['productClassId']
    const productFormData = this.prepareFormData(this.product)
    this.productService.addProduct(Id, productFormData).subscribe(
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
