import { Injectable } from '@angular/core';
import "alertifyjs/build/alertify.min.js";
import "alertifyjs/build/css/alertify.min.css";
declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirm(mess:string,okcallback:()=>any){
    alertify.confirm(mess, function(e:any){
      if(e)
      {
        okcallback();
      }else{

      }
    })
  }

  success(mess:string)
  {
    alertify.success(mess);
  }
  error(mess:string)
  {
    alertify.error(mess);
  }
  warning(mess:string)
  {
    alertify.warning(mess);
  }
  message(mess:string)
  {
    alertify.message(mess);
  }




}
