import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Customer } from '../customerDetail/customer';




@Injectable({
  providedIn: 'root'
})
export class CustomerDetailService {

	constructor(private http: HttpClient) {}

	createCustomer(cust: Customer) {
     console.log(cust);
     
   }

	 
}