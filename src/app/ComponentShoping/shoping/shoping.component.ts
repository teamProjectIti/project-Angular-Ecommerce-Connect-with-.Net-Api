import { ProductService } from 'src/app/Services/product.service';
import { IProduct } from './../../Services/Model/iproduct';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/ComponentAuth/Model/auth.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/ComponentAuth/Model/IUser';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  productList:IProduct[]=[];
  currentUser$:Observable<IUser|any>;

  constructor(private api:ProductService,private apiAuth:AuthService) { 
   this.currentUser$=this.apiAuth.currentUser$; 
   }

  ngOnInit(): void {
   this.currentUser$=this.apiAuth.currentUser$; 
    this.api.get_All_Product().subscribe(res=>{
      this.productList=res;
    },err=>{
      console.log(err);
    })
  }
  AddToCart(id:any)
  {
  }
  search(val:any) 
  {
    console.log(val);
  }
}
