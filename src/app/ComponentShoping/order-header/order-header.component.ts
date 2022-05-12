import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrderHeaderService } from 'src/app/Services/order-header.service';
import { IOrderHeader } from 'src/app/Services/Model/IOrderHeader';
import { IOrderUserBYId } from 'src/app/Services/Model/IOrderUserBYId';
import { OrderService } from 'src/app/Services/order.service';
import { AlertService } from 'src/app/Services/alert-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.css']
})
export class OrderHeaderComponent implements OnInit {

  orderHeader:IOrderHeader={} as IOrderHeader;
  orderHeaders:IOrderHeader[]=[];
  orders:IOrderUserBYId[]=[];
  Allprice:number=0;
  constructor(private router: Router,private location: Location,private api:OrderHeaderService,private api_order:OrderService,private alert:AlertService) { }

  ngOnInit(): void {
    this.api.getAllOrdreForUser().subscribe(res=>{
      this.orderHeader=res;
      this.loadingpage();
      console.log(res);
    })
    this.loadingpage();

  }
  loadingpage()
  {
    this.api_order.getAllOrdreForUser(this.orderHeader.email).subscribe(res=>{
      this.orders=res;
      this.orders.forEach((element) => {
        element.totalPrice= element.count * element.price;
        this.Allprice=this.Allprice+ element.totalPrice;
       });
    })
  }
   goback()
    {
      console.log( this.orders);
    this.location.back();
    }
    save()
    {
      this.loadingpage();
      this.orders.forEach((element) => {
       });
       this.orderHeaders.push( this.orderHeader);
       console.log(this.orderHeaders);
       this.api.PostOredrs(this.orderHeaders).subscribe(res=>{
            this.alert.success("success order ");
      this.router.navigate(['/Confirm']);

       })
    }
}
