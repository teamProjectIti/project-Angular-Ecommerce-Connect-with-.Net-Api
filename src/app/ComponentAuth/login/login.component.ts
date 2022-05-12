import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert-service.service';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb: FormBuilder,private api:AuthService,private alert:AlertService,private router: Router) {
    this.loginForm=this.fb.group({
      emailAddress:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(3)]],
    });
   }

  ngOnInit(): void {
  } 
  OnSubmet()
  {
    this.api.login(this.loginForm.value).subscribe(res=>{
      this.alert.success("user Login");
      this.router.navigate(['/slider']);
    },err=>{
      this.alert.error("faild Login");

    });
    
  }
}
