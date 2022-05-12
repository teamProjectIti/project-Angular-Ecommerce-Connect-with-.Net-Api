import { HeaderComponent } from './ComponentGeneral/header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ComponentAuth/login/login.component';
import { RegisterComponent } from './ComponentAuth/register/register.component';
import { MainLayoutSecurityComponent } from './ComponentAuth/main-layout-security/main-layout-security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './ComponentAuth/Model/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './dashboard/category/category.component';
import { BrandComponent } from './dashboard/brand/brand.component';
import { BrandService } from './Services/brand.service';
import { ProductService } from './Services/product.service';
import { CategoryService } from './Services/category.service';
import { SliderComponent } from './ComponentGeneral/slider/slider.component';
import { MainDashbourdComponent } from './ComponentGeneral/main-dashbourd/main-dashbourd.component';
import { AllCategoryComponent } from './dashboard/all-category/all-category.component';
import { HeaderCategoryComponent } from './dashboard/header-category/header-category.component';
import { FooterComponent } from './ComponentGeneral/footer/footer.component';
import { ShopingComponent } from './ComponentShoping/shoping/shoping.component';
import { DetailsShopingComponent } from './ComponentShoping/shoping/details-shoping/details-shoping.component';
import { ContactComponent } from './ComponentGeneral/contact/contact.component';
import { BasketService } from './Services/basket.service';
import { BasketProductComponent } from './ComponentShoping/shoping/basket-product/basket-product.component';
import { DetailsUserComponent } from './ComponentAuth/details-user/details-user.component';
import { OrderComponent } from './ComponentShoping/shoping/order/order.component';
import { OrderService } from './Services/order.service';
import { AllOrdreComponent } from './ComponentShoping/all-ordre/all-ordre.component';
import { OrderHeaderComponent } from './ComponentShoping/order-header/order-header.component';
import { OrderHeaderService } from './Services/order-header.service';
import { ConfirmOrderComponent } from './ComponentShoping/shoping/confirm-order/confirm-order.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutSecurityComponent,
    HeaderComponent,
    CategoryComponent,
    BrandComponent,
    SliderComponent,
    MainDashbourdComponent,
    AllCategoryComponent,
    HeaderCategoryComponent,
    FooterComponent,
    ShopingComponent,
    DetailsShopingComponent,
    ContactComponent,
    BasketProductComponent,
    DetailsUserComponent,
    OrderComponent,
    AllOrdreComponent,
    OrderHeaderComponent,
    ConfirmOrderComponent,
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [AuthService,BrandService,CategoryService,ProductService,BasketService,OrderService,OrderHeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
