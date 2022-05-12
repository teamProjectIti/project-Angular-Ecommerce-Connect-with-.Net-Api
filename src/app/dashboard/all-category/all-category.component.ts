import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert-service.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Services/Model/Icategory';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css']
})
export class AllCategoryComponent implements OnInit {
  categoreList:ICategory[]=[];

  constructor(private api:CategoryService,private activatedRoute:ActivatedRoute,private router: Router,private alert:AlertService) {
    
    this.api.get_all_category().subscribe(data=>{
      this.categoreList=data;
      console.log(this.categoreList);
      });
  }

  ngOnInit(): void {
    this.api.get_all_category().subscribe(data=>{
      this.categoreList=data;
      console.log(this.categoreList);
      });
  }
  deleteItem(id:any)
  {
    this.api.Delete_Product_ByID(id).subscribe(data=>{
      this.router.navigate(['/category']);
    })
  }
}
