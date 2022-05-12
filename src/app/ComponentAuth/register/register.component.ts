import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/Services/alert-service.service';
import { AuthService } from '../Model/auth.service';
import { IUser } from '../Model/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  RegisterForm:FormGroup|any;
  TypeUser:string="";
  currentUser$:Observable<IUser|any>;
data:string="Manager";
  constructor(private fb: FormBuilder,private api:AuthService,private alert:AlertService,private router: Router) {
    this.RegisterForm=this.fb.group({
      firstName:['', [Validators.required, Validators.minLength(3)]],
      lastName:['', [Validators.required, Validators.minLength(3)]],
      userName:['', [Validators.required, Validators.minLength(3)]],
      emailAddress:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(3)]],
      role:['', [Validators.required, Validators.minLength(3)]],
    });
    this.currentUser$=this.api.currentUser$; 
    
   }
   ngOnInit(): void {
      this.loadCurrentUser();
      this.currentUser$=this.api.currentUser$; 
  } 
  insertType(val?:any)
  {
    if(val)
    {
    this.RegisterForm.get('role').setValue(val);
    }else{
      this.RegisterForm.get('role').setValue('user');
    }
  }
  OnSubmet()
  {
    if(this.RegisterForm.get('role'))
    {
      this.RegisterForm.get('role').setValue('user');
    }
    // this.RegisterForm.controls.get('role').patchValue({ endTime: '1300' });
    this.RegisterForm.patchValue( 
    { 
    "Role": "" 
  });    this.api.register(this.RegisterForm.value).subscribe(res=>{
      this.alert.success("User Success Register");
      this.router.navigate(['/slider']);

    },err=>{
      this.alert.error("faild Register");
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
}
