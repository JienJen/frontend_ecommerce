import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
    amountInStock: 0,
    price: 0,
    imageFiles: []
  }

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit():void{
    this.product = this.activatedRoute.snapshot.data['product']

    if(this.product && this.product.id){
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm){

    const productFormData = this.prepareFormData(this.product)

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.imageFiles = [];
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        console.log(error)
      }
    );
  }
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
