import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductosComponent } from './productos/productos.component';
import { ContentComponent } from './content/content.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: '', 
    redirectTo: 'home', 
    pathMatch: 'full', },

  {path:'home', 
    component:HomeComponent},

  {path:'admin', 
    component:AdminComponent},

  {path:'user', 
    component:UserComponent},

  {path:'login', 
    component:ContentComponent},

  {path:'forbidden', 
    component:ForbiddenComponent},

  {path:'addNewProduct', 
    component: AddNewProductComponent},

  {path:'showProductDetails', 
    component: ShowProductDetailsComponent},

  {path:'Productos', 
    component:ProductosComponent},

  {path:'DetallesOrden', 
    component:OrderDetailsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
