import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from './Model/Icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url=`${environment.APIURL}`;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
    })
    };

  constructor(private http:HttpClient,private route:Router ) {  }
    
  entery_category(Category:ICategory):Observable<ICategory>
  {
    console.log(Category)
    return this.http.post<ICategory>(this.url + 'Category', Category,this.httpOptions);
  } 
  
  get_all_category():Observable<ICategory[]>
  {
    return this.http.get<ICategory[]>(`${this.url}Category`,this.httpOptions);
  }
  getCategoryByID(catergoryID: number): Observable<ICategory>
  {
    return this.http.get<ICategory>(`${this.url}Category/${catergoryID}`,this.httpOptions);
  }
  //funcation delete
  Delete_Product_ByID(id:number):Observable<ICategory[]>{
    return this.http.delete<ICategory[]>(`${this.url}Category/${id}`,this.httpOptions);
  }
    // funcation Update
    UPdate_Product_ByID(id:number,data:ICategory): Observable<ICategory>{
      return this.http.put<ICategory>(`${this.url}Category/${id}`, data,this.httpOptions);
    }
}
