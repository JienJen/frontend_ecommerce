import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ImageProcessingService } from 'src/app/_services/image-processing.service';
import { ProductService } from 'src/app/_services/product.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { NgFor } from '@angular/common';
import { DialogVariationImageComponent } from '../../Variacionproductos/dialog-variation-image/dialog-variation-image.component';
import { ClassImageProcessingService } from 'src/app/_services/class-image-processing.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabla-clase-producto',
  templateUrl: './tabla-clase-producto.component.html',
  styleUrls: ['./tabla-clase-producto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TablaClaseProductoComponent implements OnInit { 
  displayedColumns = ['id', 'name', 'description', 'category', 'actions'];
  innerDisplayedColumns = ['id', 'color', 'amountInStock', 'actions2']
  dataSource:MatTableDataSource<ClassProduct>;
  nameFilter = new FormControl('');
  expandedElement: ClassProduct | null;

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Product>>;


  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private httpClient: HttpClient,
    private imageProcessingService: ImageProcessingService,
    private classImageProcessingService: ClassImageProcessingService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    ){}

  ngOnInit(): void{
    this.getAllProducts()

  }
  
  toggleRow(element: ClassProduct) {
    element.products && (element.products as MatTableDataSource<Product>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }


  selectStage($event : any){
    if($event.value.toLowerCase() == "all"){
      this.dataSource = new MatTableDataSource(this.productsData)

    } else {
      let filteredData = _.filter(this.productsData, (item: any) =>{
      return item.category.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData)
    }
    this.dataSource.paginator = this.paginator;

  }
  
  apiResponse: any = [];
  productsData: ClassProduct[] = [];
  dataSource2 : MatTableDataSource<Product>;

  public getAllProducts(){
    this.productService.getProductClass()
    .subscribe(
      (resp: ClassProduct[]) => {
        const PRODUCTS : ClassProduct[] = resp;
        PRODUCTS.forEach(product => {
          if (product.products && Array.isArray(product.products) && product.products.length){
            this.productsData = [...this.productsData, {...product, products: new MatTableDataSource(product.products)}];
          } else {
            this.productsData = [...this.productsData, product]
          }
        });
        this.apiResponse = resp;
        this.dataSource = new MatTableDataSource(this.productsData);
        this.dataSource2 = new MatTableDataSource(this.apiResponse.products)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) =>{
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        }
      );      }
    )
  }
  
  deleteProducts(productClassId: number){
    if(window.confirm("¿Estas seguro de eliminar este Producto?"))
    this.productService.deleteClassProduct(productClassId).subscribe(
      (resp) => {
          this._snackBar.open("El producto fue eliminado con exito", "", {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          })
          window.location.reload()
      },
      (error) => {
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        }
      );      }
    );
  }

  //Usar para editar la CLASE (producto)
  editClassProduct(productClassId:number){
    this.router.navigate(['/AñadirClaseProducto', {productClassId: productClassId }])
  }

  filterData(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(){

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }

  showImages(product: Product){
    this.imagesDialog.open(DialogVariationImageComponent, {
      data:{
        images: product.imageFiles
      },
      height: '500px',
      width: '800px',
    }); 
  }
  addVariationProduct(productClassId : number){
    this.router.navigate(['/AñadirVariacionProducto/', {productClassId : productClassId}]);
    console.log(productClassId)
  }

    editVariationProduct(id :number){
    this.router.navigate(['/AñadirVariacionProducto', {id : id}]);
    console.log(id)
  }
}


export interface ClassProduct{
  productClassId: any,
  name: string,
  imageFiles: FileHandle[],
  description:  string,
  category:  string,
  products: Product[] | MatTableDataSource<Product>,
  price: number
}

export interface Product{
  id: any,
  amountInStock: number,
  imageFiles: FileHandle[]
  color:  string,
  productClassId: any
}