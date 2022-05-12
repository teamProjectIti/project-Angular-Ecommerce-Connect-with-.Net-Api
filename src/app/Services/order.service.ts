import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment';
import { IOder } from './Model/IOrder';
import { IOrderUser } from './Model/IOrderUser';
import { IOrderUserBYId } from './Model/IOrderUserBYId';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url=`${environment.APIURL}`;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
    })
    };
    constructor(private http:HttpClient,private route:Router ) {  }

    getOrder(data:any):Observable<IOder>
    {
     return this.http.get<IOder>(this.url+"OredrProducts/Detailsproduct_Order?id="+data,this.httpOptions);
    }
    postOreder(data:IOrderUser):Observable<IOrderUser>
    {
      console.log(data);
      return this.http.post<IOrderUser>(this.url+"OredrProducts/createOrder",data,this.httpOptions)
    }
    getAllOrdre(data:any):Observable<IOrderUser[]>
    {
     return this.http.get<IOrderUser[]>(this.url+"OredrProducts/getAllOrder?data="+data,this.httpOptions);
    } 
    getAllOrdreForUser(data:any):Observable<IOrderUserBYId[]>
    {
     return this.http.get<IOrderUserBYId[]>(this.url+"OredrProducts/getAllOrder?data="+data,this.httpOptions);
    }
    removeItem(data:any):Observable<IOrderUserBYId[]>
    {
     return this.http.get<IOrderUserBYId[]>(this.url+"OredrProducts/removeItem?id="+data,this.httpOptions);
    }
    increament(data:any):Observable<IOrderUserBYId[]>
    {
      return this.http.get<IOrderUserBYId[]>(this.url+"OredrProducts/plusItem?id="+data,this.httpOptions);
    }
     Minis(data:any):Observable<IOrderUserBYId[]>
    {
      return this.http.get<IOrderUserBYId[]>(this.url+"OredrProducts/minusItem?id="+data,this.httpOptions);
    }
}
