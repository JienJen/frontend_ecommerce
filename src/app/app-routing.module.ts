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
import { ProductResolveService } from './_services/product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { AuthGuard } from './_auth/auth.guard';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', 
    redirectTo: 'Inicio', 
    pathMatch: 'full', },

  {path:'Inicio', 
    component:HomeComponent},

  {path:'admin', 
    component:AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },

  {path:'user', 
    component:UserComponent, canActivate:[AuthGuard], data:{roles:['CLIENT']} },

  {path:'login', 
    component:ContentComponent},

  {path:'forbidden', 
    component:ForbiddenComponent},

  {path:'AñadirProducto', 
    component: AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']},
    resolve: {
      product: ProductResolveService
    }
  },

  {path:'DetallesProductos', 
    component: ShowProductDetailsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },

  {path: 'DetallesDeProducto',
    component: ProductViewDetailsComponent,
    resolve:{
      product: ProductResolveService}},

  {path:'MiCarrito', 
    component: MyCartComponent,  canActivate:[AuthGuard], data:{roles:['CLIENT']} },
  

  {path:'MisOrdenes', 
    component: MyOrderComponent},

  {path:'CheckOut', 
    component:CheckoutComponent},

  {path:'Productos', 
    component:ProductosComponent},

  {path:'DetallesOrden', 
    component:OrderDetailsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
