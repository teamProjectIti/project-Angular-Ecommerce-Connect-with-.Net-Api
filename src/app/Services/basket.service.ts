import { Ibasket_product } from './Model/Ibasket_product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, Observable, ReplaySubject } from 'rxjs';
import { IBasket } from './Model/IBasket';
import { IBasketConter } from './Model/IBasketConter';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  url=`${environment.APIURL}`;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
      })
    };
  private currentCountSource = new ReplaySubject<IBasketConter| null>(1);
  currentCounter$ = this.currentCountSource.asObservable();
  

  constructor(private http:HttpClient,private route:Router ) {  }
  Basket: IBasketConter={} as IBasketConter;
      
  getCount() {
    return this.http.get<any>(`${this.url}Cart/getcounter`,this.httpOptions).subscribe(res=>{
      this.Basket={counter:res};
      console.log(res);
      if(res)
      {
        this.currentCountSource.next(this.Basket);
        
      }
    })
      
  } 
  getCountBasket() {
    return this.http.get<any>(`${this.url}Cart/getcounter`,this.httpOptions);
  }
  
  getCurrentUserVAlue()
  {
    console.log(this.currentCountSource);
  }
  setCurrentUser(counter:IBasketConter) {
    this.currentCountSource.next(counter);
  }

  // loadCurrentUser() 
  // {
  //   return this.http.get(`${this.url}Cart/getcounter`,this.httpOptions).pipe(res=>{
  //     this.Basket={counter:res};
  //     console.log(res);
  //     if(res)
  //     {
  //       this.currentCountSource.next(this.Basket);
        
  //     }
  //   })
  // }

  entery_Basket(data:IBasket) 
  {
    console.log(data);
    return this.http.post<IBasket>(this.url + 'Cart',data,this.httpOptions);
  }
  logout_basket() {
    localStorage.removeItem('token');
    this.currentCountSource.next(null);
  }
  
  getProducts_Basket(data:any):Observable<any []>{
    return this.http.get<any []>(this.url + 'Cart/BasketProduct?email='+data,this.httpOptions);
  }
}