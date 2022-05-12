import { AlertService } from './../../Services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Services/Model/Icategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoreList:ICategory[]=[];

  categore:ICategory={} as ICategory;
  private id:number=0;

  constructor(private api:CategoryService,private activatedRoute:ActivatedRoute,private router: Router,private alert:AlertService) {
  }
  ngOnInit(): void {
    this.api.get_all_category().subscribe(data=>{
      this.categoreList=data;
      console.log(this.categoreList);
      });

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.id=Number(paramMap.get("id"));
      if(this.id){
        this.api.getCategoryByID(this.id).subscribe(data=>{
        this.categore=data;
      });
      } 
    });
  
  }
  
  saveCategory()
  {
    if(this.id)
    {
      console.log(this.id);
      this.api.UPdate_Product_ByID(this.id,this.categore).subscribe(product=>{
        this.router.navigate(['/slider']);
      });
    }
    else{
      console.log(this.categore);
      this.api.entery_category(this.categore).subscribe(prd=>{
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
    this.api.Delete_Product_ByID(id).subscribe(data=>{
      this.router.navigate(['']);
    })
  }
}