import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClassProduct } from '../_model/classProduct.model';
import { FileHandle } from '../_model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ClassImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: ClassProduct){
    const imageFile: any[] = product.imageFiles;
    
    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < imageFile.length; i++){
      const imageFileData = imageFile[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const productImage = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const finalFileHandle: FileHandle = {
        file: productImage,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(productImage))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.imageFiles = productImagesToFileHandle;
    return product;
  }

  public dataURItoBlob(picBytes: string, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

     const blob = new Blob([int8Array], {type: imageType});
     return blob;
  }
}
