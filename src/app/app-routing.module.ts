import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './inicio/home.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UserComponent } from './Users/user/user.component';
import { LoginComponent } from './contenido-login/login/login.component';
import { ForbiddenComponent } from './inicio/forbidden/forbidden.component';
import { OrderDetailsComponent } from './admin/todas-las-ordenes/order-details.component';
import { ProductResolveService } from './_services/product-resolve.service';
import { AuthGuard } from './_auth/auth.guard';
import { MyCartComponent } from './Users/mi-carrito/my-cart.component';
import { MyOrderComponent } from './Users/mi-orden/my-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContentComponent } from './contenido-login/content.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { ChangePasswordComponent } from './password/change-password/change-password.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ClassProductResolveService } from './_services/class-product-resolve.service';
import { TablaClaseProductoComponent } from './Productos/ClaseProductos/tabla-clase-producto/tabla-clase-producto.component';
import { AddClaseProductoComponent } from './Productos/ClaseProductos/add-clase-producto/add-clase-producto.component';
import { VistaProductosComponent } from './Productos/vista-productos/vista-productos.component';
import { VistaDetalleProductoComponent } from './Productos/vista-detalle-producto/vista-detalle-producto.component';

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


  {path:'MiCarrito', 
    component: MyCartComponent,  canActivate:[AuthGuard], data:{roles:['CLIENTE']} },
  

  {path:'MisOrdenes', 
    component: MyOrderComponent, },

  {path:'CheckOut', 
    component:CheckoutComponent},

  {path:'detalles-orden'  , 
    component:OrderDetailsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  
  {path:'changePassword/:token',
    component: ChangePasswordComponent},

  {path:'olvidarContraseña',
    component: ForgotPasswordComponent},

  {path: 'DetallesClaseProducto',
    component: TablaClaseProductoComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},

  {path: 'AñadirClaseProducto',
    component: AddClaseProductoComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']},
    resolve: {
      classProduct: ClassProductResolveService
    }},
  
  {path: 'Productos',
    component: VistaProductosComponent},

  {path: 'Producto',
    component: VistaDetalleProductoComponent,
    resolve:{
      classProduct: ClassProductResolveService,
      product: ProductResolveService}},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
