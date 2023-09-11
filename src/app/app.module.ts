import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './inicio/home.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UserComponent } from './Users/user/user.component';
import { LoginComponent } from './contenido-login/login/login.component';
import { HeaderComponent } from './inicio/header/header.component';
import { ForbiddenComponent } from './inicio/forbidden/forbidden.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { AuthGuard } from './_auth/auth.guard';
import { UserServiceService } from './_services/user-service.service';
import { MyCartComponent } from './Users/mi-carrito/my-cart.component';
import { MyOrderComponent } from './Users/mi-orden/my-order.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyCartItemsComponent } from './Users/mi-carrito/tabla-carrito/my-cart-items.component';
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './inicio/footer/footer.component';
import { ContentComponent } from './contenido-login/content.component';
import {MatSnackBarModule, MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { SidenavComponent } from './inicio/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './password/forgot-password/change-password/change-password.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { NgBusyModule } from 'ng-busy';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FacturarComponent } from './checkout/facturar/facturar.component';
import { OrderDetailsComponent } from './admin/todas-las-ordenes/order-details.component';
import { CustomMatPaginatorIntl, VistaProductosComponent } from './Productos/vista-productos/vista-productos.component';
import { AddClaseProductoComponent } from './Productos/ClaseProductos/add-clase-producto/add-clase-producto.component';
import { TablaClaseProductoComponent } from './Productos/ClaseProductos/tabla-clase-producto/tabla-clase-producto.component';
import { VistaDetalleProductoComponent } from './Productos/vista-detalle-producto/vista-detalle-producto.component';
import { AddVariacionProductoComponent } from './Productos/Variacionproductos/add-variacion-producto/add-variacion-producto.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogVariationImageComponent } from './Productos/Variacionproductos/dialog-variation-image/dialog-variation-image.component';
import { DialogAddVariacionComponent } from './Productos/Variacionproductos/dialog-add-variacion/dialog-add-variacion.component';
import { ChangePasswComponent } from './password/change-passw/change-passw.component';
import { VerificadoComponent } from './inicio/verificado/verificado.component';
import { VerificadoEmailComponent } from './inicio/verificado-email/verificado-email.component';
import { CambiarEmailComponent } from './cambiar-email/cambiar-email.component';
import { EditRucComponent } from './Users/edit-ruc/edit-ruc.component';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    OrderDetailsComponent,
    MyCartComponent,
    MyOrderComponent,
    CheckoutComponent,
    MyCartItemsComponent,
    FooterComponent,
    ContentComponent,
    AllUsersComponent,
    SidenavComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    FacturarComponent,
    VistaProductosComponent,
    AddClaseProductoComponent,
    TablaClaseProductoComponent,
    VistaDetalleProductoComponent,
    AddVariacionProductoComponent,
    DialogVariationImageComponent,
    DialogAddVariacionComponent,
    ChangePasswComponent,
    VerificadoComponent,
    VerificadoEmailComponent,
    CambiarEmailComponent,
    EditRucComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatGridListModule,
    CarouselModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    NgBusyModule,
    NgxUiLoaderModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],

  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
      
    },
    UserServiceService,
    CustomMatPaginatorIntl,
    { 
      provide: MatPaginatorIntl, 
      useClass: CustomMatPaginatorIntl
    },
    MatSnackBarModule,
      {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
        useValue: matSnackbarDefaultConfig
      }

  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
