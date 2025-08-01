import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenServiceService {

  constructor() { }
  saveToken(token:string){
    return localStorage.setItem('TokenPass',token);
  }
  deleteToken(){
    return localStorage.removeItem('TokenPass');
  }
  getToken(){
    return localStorage.getItem('TokenPass');
  }
  getclaims(){
    const payload = this.getToken()!.split('.')[1];
    const decode =window.atob(payload);
    return JSON.parse(decode);
  }
    isLoggin(){
     const result = this.getToken();
    if(result != null){
      return true;
    }
    else{
      return false;
    }
  }
}
