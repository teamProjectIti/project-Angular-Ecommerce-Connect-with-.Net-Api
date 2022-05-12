import { IBasketConter } from './../../Services/Model/IBasketConter';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/ComponentAuth/Model/IUser';
import { AuthService } from 'src/app/ComponentAuth/Model/auth.service';
import { BasketService } from 'src/app/Services/basket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser$:Observable<IUser|any>;
  currentCounter$:Observable<IBasketConter|any>;
  
  constructor(private api:AuthService,private api_Basket:BasketService,private activatedRoute:ActivatedRoute) {
    this.currentUser$=this.api.currentUser$; 
    this.currentCounter$=this.api_Basket.currentCounter$; 
     }
id:number=0;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( ()=>{
      
   this.currentUser$=this.api.currentUser$; 
   this.loadCurrentUser();
   this.api_Basket.getCount();
   this.loadCurrenCountertUser();
   this.currentCounter$=this.api_Basket.currentCounter$; 
   this.api_Basket.getCurrentUserVAlue();
   this.api_Basket.getCount();
    });
      


   this.currentUser$=this.api.currentUser$; 
   this.loadCurrentUser();
   this.api_Basket.getCount();
   this.loadCurrenCountertUser();
   this.currentCounter$=this.api_Basket.currentCounter$; 
   this.api_Basket.getCurrentUserVAlue();
   this.api_Basket.getCount();
  }
  logout()
  {
    this.api.logout();
  }
  loadCurrentUser()
  {
    const token=localStorage.getItem('token');
    if(token)
    {
      this.api_Basket.getCurrentUserVAlue();
      this.api_Basket.getCount();
      this.api.loadCurrentUser().subscribe(()=>{
        console.log("user login");
      },err=>{
        console.log(err);
      });
    }
  }
  loadCurrenCountertUser()
  {
    const token=localStorage.getItem('token');
    if(token)
    {
      this.api.loadCurrentUser().subscribe(()=>{
 
        this.api_Basket.getCurrentUserVAlue();
        this.api_Basket.getCount();

      },err=>{
        console.log(err);
      });
    }
  }

}
