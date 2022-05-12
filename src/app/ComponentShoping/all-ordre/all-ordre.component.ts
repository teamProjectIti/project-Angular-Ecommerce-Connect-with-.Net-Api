import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert-service.service';
import { IOrderUser } from 'src/app/Services/Model/IOrderUser';
import { IOrderUserBYId } from 'src/app/Services/Model/IOrderUserBYId';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { Location } from '@angular/common';
import { OrderHeaderService } from 'src/app/Services/order-header.service';

@Component({
  selector: 'app-all-ordre',
  templateUrl: './all-ordre.component.html',
  styleUrls: ['./all-ordre.component.css']
})
export class AllOrdreComponent implements OnInit {
  email:any;
  orders:IOrderUserBYId[]=[];
  id:number=0;
  url:any;
  AllPrice:number|any=0;
  constructor(private router: Router,private apiHeader:OrderHeaderService,private location: Location,private api:OrderService,private activatedRoute:ActivatedRoute,private api_pro:ProductService,private alert:AlertService) { }

loadingpage()
{
  this.api.getAllOrdreForUser(this.email).subscribe(res=>{
    this.orders=res;
    this.orders.forEach((element) => {
     this.AllPrice=this.AllPrice+element.price;
     console.log(element)
     });
  })
}

  ngOnInit(): void {
    this.email=this.activatedRoute.snapshot.paramMap.get("email");
    console.log(this.email);
    this.loadingpage();
    }
    plus(val:any)
    {
      this.api.increament(val).subscribe(res=>{
      this.alert.success("Success Increament ");
    this.loadingpage();

      },err=>{console.log(err)});

      this.api.getAllOrdreForUser(this.email).subscribe(res=>{
        this.orders=res;
        console.log(this.orders);
      })
    }
    mins(val:any)
    {
      this.api.Minis(val).subscribe(res=>{
        this.alert.success("Success Mins ");
        this.loadingpage();

        },err=>{console.log(err)});
  
        this.api.getAllOrdreForUser(this.email).subscribe(res=>{
          this.orders=res;
          console.log(this.orders);
        })
    }
    remove(data:any)
    {
      this.api.removeItem(data).subscribe(res=>{
        this.alert.success("Success Mins ");
        this.loadingpage();
      },err=>{
        this.alert.error("Success Mins ");
      })
    }
    goback()
    {
    this.location.back();
    }

    showDetails(id:any)
  {
    console.log(id);
    this.api_pro.get_product_Img_ByID(id).subscribe(res=>{
      this.url=res;
    console.log(this.url);

    })
  }

  submit()
    {
      this.router.navigate(['/OrderHeader']);
    }
  }
