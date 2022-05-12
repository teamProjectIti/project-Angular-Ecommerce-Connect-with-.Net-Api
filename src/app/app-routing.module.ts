import { BasketProductComponent } from './ComponentShoping/shoping/basket-product/basket-product.component';
import { DetailsShopingComponent } from './ComponentShoping/shoping/details-shoping/details-shoping.component';
import { ShopingComponent } from './ComponentShoping/shoping/shoping.component';
import { HeaderCategoryComponent } from './dashboard/header-category/header-category.component';
import { MainDashbourdComponent } from './ComponentGeneral/main-dashbourd/main-dashbourd.component';
import { SliderComponent } from './ComponentGeneral/slider/slider.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { BrandComponent } from './dashboard/brand/brand.component';
import { MainLayoutSecurityComponent } from './ComponentAuth/main-layout-security/main-layout-security.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './ComponentAuth/register/register.component';
import { LoginComponent } from './ComponentAuth/login/login.component';
import { AllCategoryComponent } from './dashboard/all-category/all-category.component';
import { ContactComponent } from './ComponentGeneral/contact/contact.component';
import { DetailsUserComponent } from './ComponentAuth/details-user/details-user.component';
import { OrderComponent } from './ComponentShoping/shoping/order/order.component';
import { AllOrdreComponent } from './ComponentShoping/all-ordre/all-ordre.component';
import { OrderHeaderComponent } from './ComponentShoping/order-header/order-header.component';
import { ConfirmOrderComponent } from './ComponentShoping/shoping/confirm-order/confirm-order.component';

 // import { NotfoundPageComponent } from './ComponentGeneral/header/notfound-page/notfound-page.component';
// import { HomeComponent } from './ComponentGeneral/header/home/home.component';

const routes: Routes = [
 
  {path:'slider', component:SliderComponent},
  {path:'', redirectTo:'/slider', pathMatch:'full'},


  {path:'', component:MainLayoutSecurityComponent,children:[
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    ]},
    {path:'', component:MainDashbourdComponent,children:[
      {path:'brand', component:BrandComponent},
      {path:'category', component:CategoryComponent},
      {path:'Allcategory', component:AllCategoryComponent},
      {path:'category/:id', component:CategoryComponent},
      {path:'brand/:id', component:BrandComponent},
      {path:'Product/:id', component:HeaderCategoryComponent},
      {path:'admin', component:HeaderCategoryComponent},
      ]},
      {path:'shop', component:ShopingComponent},
      {path:'AllOrder/:email', component:AllOrdreComponent},
      {path:'AllOrder', component:AllOrdreComponent},
      {path:'Details-shoping/:id', component:DetailsShopingComponent},
      {path:'basket/:email', component:BasketProductComponent},
      {path:'basket', component:BasketProductComponent},
      {path:'contact', component:ContactComponent},
      {path:'detailsUser', component:DetailsUserComponent}, 
      {path:'OrderHeader', component:OrderHeaderComponent}, 
      {path:'ordre/:id', component:OrderComponent}, 
      {path:'Confirm', component:ConfirmOrderComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
