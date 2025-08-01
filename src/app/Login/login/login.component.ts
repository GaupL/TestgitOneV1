import { Component, inject } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../Service/login-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private service:LoginServiceService){}
  formBuiderOne = inject(FormBuilder);

  form = this.formBuiderOne.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  hasDisplaybleError(controlname:string):boolean{
   const control = this.form.get(controlname);
    return Boolean(control?.invalid) && (Boolean(control?.touched) || Boolean(control?.dirty))
  }

onSubmit(){
  if(this.form.valid){
    this.service.postLogin(this.form.value);
  }
}
}
