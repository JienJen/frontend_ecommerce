import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './inicio/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AddNewProductComponent } from './nuevo-producto/add-new-product.component';
import { ShowProductDetailsComponent } from './detalles-productos-tabla/show-product-details.component';
import { ProductosComponent } from './productos/productos.component';
import { OrderDetailsComponent } from './todas-las-ordenes/order-details.component';
import { ProductResolveService } from './_services/product-resolve.service';
import { ProductViewDetailsComponent } from './ver-producto/product-view-details.component';
import { AuthGuard } from './_auth/auth.guard';
import { MyCartComponent } from './mi-carrito/my-cart.component';
import { MyOrderComponent } from './mi-orden/my-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContentComponent } from './contenido-login/content.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  { path: '', 
    redirectTo: 'Inicio', 
    pathMatch: 'full', },

  {path:'Inicio', 
    component:HomeComponent},


  {path:'admin', 
    component:AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },

  {path:'user', 
    component:UserComponent, canActivate:[AuthGuard], data:{roles:['CLIENTE']} },

  {path:'usuarios', 
    component:AllUsersComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },

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

  {path: 'Producto',
    component: ProductViewDetailsComponent,
    resolve:{
      product: ProductResolveService}},

  {path:'MiCarrito', 
    component: MyCartComponent,  canActivate:[AuthGuard], data:{roles:['CLIENTE']} },
  

  {path:'MisOrdenes', 
    component: MyOrderComponent, },

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
