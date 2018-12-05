import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../customerDetail/customer';
 import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	  headers : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; image/*',
	  'Authorization': 'my-auth-token'})
	};

@Injectable({
  providedIn: 'root'
})
export class ComplaintService 
  {
	constructor(private http: HttpClient ){
	
	}

	/* @checkExistingCustomer - function  called on submitting customer phonenumber to fetch customer detail from DataBase from Complaint Page*/
	public checkExistingCustomer(val:string):Observable<any>{
		
		let headers:HttpHeaders = new HttpHeaders();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
		headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		headers.append('Content-type', 'application/json; charset=utf-8');
		
		let params:HttpParams = new HttpParams();
		params = params.append('inputPhone', val);		
		return this.http.get("http://localhost/api/complaint/complaint.php?",{headers:headers, params:params});
	}

	/* @complaintRegister - function  called on submitting customer complaint to database from Complaint Page*/
	public complaintRegister(cust:Customer):Observable<any>{		
		let url = "http://localhost/api/complaint/complaintregister.php";
  		return this.http.post(url, cust, httpOptions);
	}

	
}