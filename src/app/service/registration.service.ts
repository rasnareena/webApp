import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { Customer } from '../customerDetail/customer';
 import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	  headers : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
	};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

	constructor(private http: HttpClient) {}	

	/* @postCustomerDetail - function  called on submitting customer details to database from Registration Page*/
	 public postCustomerDetail(cust:Customer): Observable<any> {	 	
	 	let url = "http://localhost/api/customer/customerregistration.php";
  		return this.http.post(url, cust, httpOptions);	 
	 }

	 
	}