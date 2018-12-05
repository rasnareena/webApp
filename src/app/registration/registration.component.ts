import { Component, OnInit } from '@angular/core';
import {NgForm, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MasterDataService } from '../service/masterData.service';
import { RegistrationService } from '../service/registration.service';
import { CustomerDetailService } from '../service/customerDetail.service';
import { Customer } from '../customerDetail/customer';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
firstName = "";
lastName = "";
societyname = "";
cust = new Customer();
isSuccess:Boolean = false;
errorMessage:string = "";
  

  constructor(private formBuilder:FormBuilder, private appMasterDataService: MasterDataService ,
  private appCustomerDetailService:CustomerDetailService, private appRegistrationService:RegistrationService) { }

  ngOnInit() {
  
  }

  /* @register - function  called on submitting customer detains from Registration Page*/
  register(f:NgForm){   
  this.cust.address = f.value.flatno +' '+f.value.societyname;
  this.cust.resgistrationDate = new Date();
  this.cust.registered = 'true';

  this.appRegistrationService.postCustomerDetail(this.cust as Customer).subscribe(
  success=> {this.isSuccess = true;
              this.errorMessage = "";},
  error=>{  
  this.isSuccess = false;
  this.handleError(error);
  
  }  );
  
  this.appCustomerDetailService.createCustomer(this.cust);
  this.cust = new Customer();
  f.resetForm();
  }

  private handleError(error: HttpErrorResponse ) {
   this.isSuccess = false;
   this.errorMessage = error.error.text; 
      
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  

}
