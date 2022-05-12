import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrderHeader } from './Model/IOrderHeader';

@Injectable({
  providedIn: 'root'
})
export class OrderHeaderService {

  url=`${environment.APIURL}`;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
    })
    };

  constructor(private http:HttpClient,private route:Router ) {  }
    
  getAllOrdreForUser():Observable<IOrderHeader>
  {
   return this.http.get<IOrderHeader>(this.url+"OredrProducts/getAllOrder_ByConfirm",this.httpOptions);
  }
PostOredrs(data:IOrderHeader[]):Observable<IOrderHeader>
  {
   return this.http.post<IOrderHeader>(this.url+"OredrProducts/getAllOrder_ByConfirmPost",data,this.httpOptions);
  }

}
