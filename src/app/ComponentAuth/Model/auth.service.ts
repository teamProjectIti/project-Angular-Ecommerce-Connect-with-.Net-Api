import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, ReplaySubject } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';
import { environment } from 'src/environments/environment';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  url=`${environment.APIURL}`;
  private currentUserSource = new ReplaySubject<IUser|any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('token')
    })
    };

  constructor(private http:HttpClient,private route:Router,private Apibasket:BasketService ) {  }
    
  getUser():Observable<IUser> {
    return this.http.get<IUser>('http://localhost:5000/api/Auth/GetCrrentUser',this.httpOptions);
  }
  loadCurrentUser()
  {
    return this.http.get(this.url+'Auth/GetCrrentUser',this.httpOptions).pipe(
      map((user:IUser|any)=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any) {
    console.log(model);
    return this.http.post(this.url + 'Auth/Register', model).pipe(
      map((user: any) =>{
        if (user) {
          localStorage.setItem('token', user.token)
          this.currentUserSource.next(user)
        }
      })
    )
    }
    
  login(model: IUser) {
    return this.http.post(this.url + 'Auth/login-user', model).pipe(
      map((response: IUser|any) =>{
        if (response) {
          localStorage.setItem('token', response.token)
          this.currentUserSource.next(response)
        }
      })
    )
  }
  // getCurrentUserVAlue()
  // {
  //   return this.currentUserSource.;
  // }
  setCurrentUser(user:IUser) {
    this.currentUserSource.next(user);
  }
  // userData:IUser={} as IUser;
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.route.navigate(['']);
    this.Apibasket.logout_basket();
  }
}