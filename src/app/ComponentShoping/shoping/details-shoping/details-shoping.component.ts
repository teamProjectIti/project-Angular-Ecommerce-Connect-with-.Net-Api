import { IBasket } from './../../../Services/Model/IBasket';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Services/Model/iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { Location } from '@angular/common';
import { BasketService } from 'src/app/Services/basket.service';
import { AlertService } from 'src/app/Services/alert-service.service';
import { IBasketConter } from 'src/app/Services/Model/IBasketConter';

@Component({
  selector: 'app-details-shoping',
  templateUrl: './details-shoping.component.html',
  styleUrls: ['./details-shoping.component.css']
})
export class DetailsShopingComponent implements OnInit {
product:IProduct={} as IProduct;
private id:number=0;
url:any[]=[]

  constructor(private alert:AlertService,private api_Basket:BasketService,private api:ProductService,private activatedRoute:ActivatedRoute,private router: Router,private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.id=Number(paramMap.get("id"));
      if(this.id){
        this.api.get_product_ByID(this.id).subscribe(data=>{
        this.product=data;
      });
      } 
    });
    console.log(this.product);
  this.api.get_product_Img_ByID(this.id).subscribe(res=>{
    this.url=res;
    console.log(res);

  },err=>{
    console.log(err);
  })

  }
  goBack()
  {
    this.location.back();
  }
  Basket: IBasket={} as IBasket;
  BasketCounter: IBasketConter={} as IBasketConter;

  Buy(data:any)
  {
  
    this.Basket={IDProduct:data};

  this.api_Basket.entery_Basket(this.Basket).subscribe(res=>{
    this.BasketCounter={counter:res};
    this.api_Basket.setCurrentUser(this.BasketCounter);
    this.alert.success("Success Add To Card");
  },err=>{
    this.alert.message("Sorry Not Add To Card");
    console.log(err);
  })
  this.api_Basket.getCurrentUserVAlue();
    this.api_Basket.getCount();
  }
}