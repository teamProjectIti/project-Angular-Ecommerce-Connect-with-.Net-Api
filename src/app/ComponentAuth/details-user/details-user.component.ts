import { IUser } from 'src/app/ComponentAuth/Model/IUser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  user:IUser ={} as IUser;
  constructor(private api:AuthService) { }

  ngOnInit(): void {
  this.api.getUser().subscribe(res=>{
    this.user=res;
  })
  }

}
