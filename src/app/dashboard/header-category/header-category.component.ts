import { IBrand } from 'src/app/Services/Model/Ibrand';
import { BrandService } from './../../Services/brand.service';
import { CategoryService } from './../../Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/Services/Model/Icategory';
import { AlertService } from 'src/app/Services/alert-service.service';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.css']
})
export class HeaderCategoryComponent implements OnInit {
  catList:ICategory[]=[];
  BrandList:IBrand[]=[];
  uploadForm: FormGroup|any;  
  constructor(private router: Router,private formBuilder: FormBuilder, private httpClient: HttpClient,private apiCat:CategoryService,private apiBrand:BrandService,private alert:AlertService) { 

    this.uploadForm = this.formBuilder.group({
      Name: [''],
      Description:[''],
      qountity:[''],
      Price:[''],
      Date_attach:[''],
      Date_Experied:[''],
      PictureUrl: [''],
      picturGallaryFils:[''],
      categore_ID:[''],
      product_ID_brand:['']
    });

    
    this.apiCat.get_all_category().subscribe(data=>{
      this.catList=data;
      console.log(this.catList);
     });
     this.apiBrand.get_all_Brand().subscribe(data=>{
       this.BrandList=data;
       console.log(this.BrandList);
   });
  }

 fileToUpload:any;
 productImg:any;
 selectedFile:any;
 handleFileInput2(file:any){
 this.selectedFile=<File>file.target.files[0];
 var reader=new FileReader();
 reader.onload=(event:any)=>{
   this.productImg =event.target.result;
   
 }
reader.readAsDataURL(this.selectedFile);
 
 }

  urls:any[]=[];

result:any[]=[];
selectedFiles:any;
filestoupload:any;

  onselect2(file2:any){
  if(file2.target.files){
   for(var i=0;i<File.length;i++){
      var reader=new FileReader();//read our uploaded file
     this.filestoupload=file2.target.files[i]
     reader.readAsDataURL(file2.target.files[i]);
      reader.onload=(event:any)=>{
       this.result.push(event.target.result);
       //this.urls.push(file2.target.files[i]);
       this.urls.push(event.target.result);
       console.log(this.urls);
     }//for
   }//if
     this.selectedFiles+=<FileList>file2.target.files[i];
     //this.urls.push(this.selectedFiles);
   }
   this.selectedFiles=<FileList>file2.target.files;
  
 }
  ngOnInit(): void {

    this.apiCat.get_all_category().subscribe(data=>{
      this.catList=data;
      console.log(this.catList);
     });

     this.apiBrand.get_all_Brand().subscribe(data=>{
       this.BrandList=data;
       console.log(this.BrandList);
   });
  }

  SERVER_URL = "http://localhost:5000/api/ProductClothes";
  onSubmit(data:any) {
    const formData=new FormData();   
    formData.append('PictureUrl',this.selectedFile);
    formData.append('Name',data.Name);
    formData.append('Description',data.Description); 
    formData.append('qountity',data.qountity);  
    formData.append('Date_Experied',data.Date_Experied);   
    formData.append('Date_attach',data.Date_attach);   
    formData.append('Price',data.Price);    
    formData.append('categore_ID',data.categore_ID);   
    formData.append('product_ID_brand',data.product_ID_brand);    
    let files: File[]=this.selectedFiles;
      //let myFormData: FormData = new FormData();

      for (let i = 0; i < files.length; i++) {
        let file: File = files[i];
       // formData.append('file', file, file.name);
        formData.append('picturGallaryFils', file, file.name);    // the filed name is `files` because the server side declares a `Files` property
      }
    this.httpClient.post(this.SERVER_URL,formData).subscribe(res=>{
      this.alert.success("Success Add Product");
      this.router.navigate(['/shop']); 
      this.data();
    },err=>{
      console.log(err);
    }     
    );
  }
  data()
  {
    this.uploadForm.get('Name').setValue('');
    this.uploadForm.get('Description').setValue('');
    this.uploadForm.get('qountity').setValue('');
    this.uploadForm.get('Date_Experied').setValue('');
    this.uploadForm.get('Date_attach').setValue('');
    this.uploadForm.get('Price').setValue('');
    this.uploadForm.get('categore_ID').setValue('');
    this.uploadForm.get('product_ID_brand').setValue('');
  }
}