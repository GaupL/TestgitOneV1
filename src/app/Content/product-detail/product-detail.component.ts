import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { CustomerServiceService } from '../../Service/customer-service.service';
import { EmployeeServiceService } from '../../Service/employee-service.service';
import { ProductDetailServiceService } from '../../Service/product-detail-service.service';
import { Router } from '@angular/router';
import { Employee } from '../../../model/employee';
import { Customer } from '../../../model/customer';
import { Product } from '../../../model/Product';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthenServiceService } from '../../Service/authen/authen-service.service';
import { jwtPayload } from '../../../model/register';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styles: ``
})
export class ProductDetailComponent implements OnInit {
  constructor(public servicePro:ProductDetailServiceService,public serviceCus:CustomerServiceService,public serviceEmp:EmployeeServiceService,private toastr:ToastrService){}
  route = inject(Router);
  modelEmp : Employee = new Employee();
  modelCus : Customer = new Customer();
  serviceAuth = inject(AuthenServiceService);


  ngOnInit(): void {
    this.serviceCus.getCustomers();
    this.serviceEmp.getEmployees();
    this.servicePro.getProducts();
    
  }

  onFilterChange(){
    this.servicePro.selectedGetddlV4().subscribe({
      next:res=>{
        this.servicePro.modelList = res as Product[];
      },
      error(err) {
        console.log(err);
        
      },
    });
  }
  addData(){
     this.route.navigateByUrl('/content/proByAdmin')
  }
  dataDelete(id:string,item:any){
      if(confirm('คุณต้องการที่จะลบ ' +item.productName +' หรือไม่'))
      {
        this.servicePro.deleteProduct(id).subscribe({
          next:res=>{
              this.serviceCus.getCustomers();
              this.serviceEmp.getEmployees();
              this.servicePro.getProducts();
          },
          error(err) {
            console.log(err);
          },
        });
      }
    
  }
  dataEdit(id:string){
    this.route.navigate(['/content/proByAdmin',id])
  }

}
