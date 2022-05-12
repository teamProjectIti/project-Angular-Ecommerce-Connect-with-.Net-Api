import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert-service.service';
import { BasketService } from 'src/app/Services/basket.service';
import { Ibasket_product } from 'src/app/Services/Model/Ibasket_product';
import { ProductService } from 'src/app/Services/product.service';
import { Location } from '@angular/common';
import { IProduct } from 'src/app/Services/Model/iproduct';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.css']
})
export class BasketProductComponent implements OnInit {

  product:IProduct|any;
  email:any;
  constructor(private alert:AlertService,private api_Basket:BasketService,private api:ProductService,private activatedRoute:ActivatedRoute,private router: Router,private location: Location) { }

  ngOnInit(): void {
     this.email=this.activatedRoute.snapshot.paramMap.get("email");
     console.log(this.email);
    this.api_Basket.getProducts_Basket(this.email).subscribe(res=>{
      this.product=res;
      console.log(this.product);
    })
  }

}