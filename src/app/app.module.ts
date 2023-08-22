import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './inicio/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddNewProductComponent } from './nuevo-producto/add-new-product.component';
import { ShowProductDetailsComponent } from './detalles-productos-tabla/show-product-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductosComponent } from './productos/productos.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule} from '@angular/material/icon';
import { ShowProductImagesDialogComponent } from './detalles-productos-imagenes/show-product-images-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderDetailsComponent } from './todas-las-ordenes/order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductViewDetailsComponent } from './ver-producto/product-view-details.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { AuthGuard } from './_auth/auth.guard';
import { UserServiceService } from './_services/user-service.service';
import { MyCartComponent } from './mi-carrito/my-cart.component';
import { MyOrderComponent } from './mi-orden/my-order.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyCartItemsComponent } from './tabla-carrito/my-cart-items.component';
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './contenido-login/content.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { AllUsersComponent } from './all-users/all-users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CustomMatPaginatorIntl } from './productos/productos.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    ShowProductDetailsComponent,
    ProductosComponent,
    ShowProductImagesDialogComponent,
    OrderDetailsComponent,
    ProductViewDetailsComponent,
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
    }

  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
