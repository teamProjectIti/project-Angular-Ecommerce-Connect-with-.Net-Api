import { IBrand } from './Model/Ibrand';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  url=`${environment.APIURL}`;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
    })
    };

  constructor(private http:HttpClient,private route:Router ) {  }
  
  entery_brand(IBrand:IBrand):Observable<IBrand>
  {
    return this.http.post<IBrand>(this.url + 'Brand', IBrand,this.httpOptions);
  } 
  get_all_Brand():Observable<IBrand[]>
  {
    return this.http.get<IBrand[]>(`${this.url}Brand`,this.httpOptions);
  }
  get_Brand_ByID(catergoryID: number): Observable<IBrand>
  {
    return this.http.get<IBrand>(`${this.url}Brand/${catergoryID}`,this.httpOptions);
  }
  //funcation delete
  Delete_Brand_ByID(id:number):Observable<IBrand[]>{
    return this.http.delete<IBrand[]>(`${this.url}Brand/${id}`,this.httpOptions);
  }
    // funcation Update
    UPdate_Brand_ByID(id:number,data:IBrand): Observable<IBrand>{
      return this.http.put<IBrand>(`${this.url}Brand/${id}`, data,this.httpOptions);
    }
}
