import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert-service.service';
import { BrandService } from 'src/app/Services/brand.service';
import { IBrand } from 'src/app/Services/Model/Ibrand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brandList:IBrand[]=[];

  brand:IBrand={} as IBrand;
  private id:number=0;

  constructor(private api:BrandService,private activatedRoute:ActivatedRoute,private router: Router,private alert:AlertService) {
    
     

  }
  ngOnInit(): void {
    this.api.get_all_Brand().subscribe(data=>{
      this.brandList=data;
      });

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.id=Number(paramMap.get("id"));
      if(this.id){
        this.api.get_Brand_ByID(this.id).subscribe(data=>{
        this.brand=data;
      });
      } 
    });
  
  }
  
  saveCategory()
  {
    if(this.id)
    {
      console.log(this.id);
      this.api.UPdate_Brand_ByID(this.id,this.brand).subscribe(product=>{
        this.router.navigate(['/slider']);
      });
    }
    else{
      console.log(this.brand);
      this.api.entery_brand(this.brand).subscribe(prd=>{
      this.alert.message("Success insert data");
      this.router.navigate(['/slider']);
    },err=>{
      this.alert.error("faild insert data");
      console.log(err);
    });
    }
  }
  deleteItem(id:any)
  {
    this.api.Delete_Brand_ByID(id).subscribe(data=>{
      console.log(data);
      this.alert.message("Success Delete Item");
      this.router.navigate(['/slider']); 
      })
  }
}