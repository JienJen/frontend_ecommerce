import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ClassProduct } from '../../ClaseProductos/tabla-clase-producto/tabla-clase-producto.component';
import { ClassImageProcessingService } from 'src/app/_services/class-image-processing.service';

@Component({
  selector: 'app-dialog-variation-image',
  templateUrl: './dialog-variation-image.component.html',
  styleUrls: ['./dialog-variation-image.component.css']
})
export class DialogVariationImageComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
 ){}

  ngOnInit(): void {
  }


}
