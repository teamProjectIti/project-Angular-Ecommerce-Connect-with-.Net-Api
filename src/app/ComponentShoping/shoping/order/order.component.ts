import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert-service.service';
import { IOder } from 'src/app/Services/Model/IOrder';
import { IOrderUser } from 'src/app/Services/Model/IOrderUser';
import { OrderService } from 'src/app/Services/order.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/ComponentAuth/Model/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from 'src/app/ComponentAuth/Model/IUser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentUser$:Observable<IUser|any>;

id:number=0;
product:IOder ={} as IOder;
totaprice:any;
ordreData:IOrderUser={} as IOrderUser;
countItem:any;
  constructor(private router: Router,private api:AuthService,private location: Location,private activatedRoute:ActivatedRoute ,private alert:AlertService,private apiOrder:OrderService) {
    this.currentUser$=this.api.currentUser$; 
 
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.currentUser$=this.api.currentUser$; 
  this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.id=Number(paramMap.get("id"));
      if(this.id){
        this.apiOrder.getOrder(this.id).subscribe(data=>{
        this.product=data;
        console.log(this.product);
      });
      } 
    });
  }
  loadCurrentUser()
  {
    const token=localStorage.getItem('token');
    if(token)
    {
      this.api.loadCurrentUser().subscribe(()=>{
        console.log("user login");
      },err=>{
        console.log(err);
      });
    }
  }
  goBack()
  {
    this.location.back();
  }
  saveOrder(value:any)
  {
    this.ordreData={email:value,totalPrice:this.totaprice,count:this.countItem,idProduct:this.product.idProduct,nameProduct:this.product.name_product,price:this.product.price}
    this.apiOrder.postOreder(this.ordreData).subscribe(res=>{
      this.alert.message("Success insert data");
      this.router.navigate(['/slider']); 
    },err=>{
      console.log(err);
    })
  }
  clac(val:any,price:any)
  {
    this.countItem=val;
    this.totaprice=val*price;
   console.log(val);
  }
}
