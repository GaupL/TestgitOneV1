import { inject, Injectable, model } from '@angular/core';
import { Login } from '../../model/login';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { routes } from '../app.routes';
import { AuthenServiceService } from './authen/authen-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
   private url:string = "https://localhost:7022/api/Register";
   model:Login = new Login();
   modelList :Login[] = [];
   route = inject(Router);
   
  constructor(private http:HttpClient,private serviceAuth:AuthenServiceService) { }
  postLogin(formdata:any){
    return this.http.post(this.url+'/login',formdata).subscribe({
      next:(res:any)=>{
        this.serviceAuth.saveToken(res.token);
        this.route.navigateByUrl('/content/productDetail');
      },
      error(err) {
        console.log('ผิดพลาด',err);
        
      },
    });
  }
}
