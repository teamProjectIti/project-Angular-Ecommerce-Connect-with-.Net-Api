import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProduct } from './Model/iproduct';
import { Iproduct_insert } from './Model/Iproduct_insert';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url=`${environment.APIURL}`;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
    })
    };

  constructor(private http:HttpClient,private route:Router ) {  }
    
  entery_Product(product:FormData)
  {
    console.log(product);
    return this.http.post(this.url + 'ProductClothes', product,this.httpOptions);
  } 
  get_All_Product():Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(this.url + 'ProductClothes',this.httpOptions);
  }

  get_product_ByID(catergoryID: number): Observable<IProduct>
  {
    return this.http.get<IProduct>(`${this.url}ProductClothes/${catergoryID}`);
  }
  get_product_Img_ByID(id: number): Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(`${this.url}ProductClothes/GetProductGallary/${id}`,this.httpOptions);
  }
  //funcation delete
  Delete_Product_ByID(id:number):Observable<IProduct>{
    return this.http.delete<IProduct>(`${this.url}ProductClothes/${id}`);
  }
    // funcation Update
    UPdate_Product_ByID(id:number,data:IProduct): Observable<IProduct>{
      return this.http.put<IProduct>(`${this.url}products/${id}`, data);
    }

}
