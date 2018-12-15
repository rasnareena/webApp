import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../service/masterData.service';
import{ ComplaintService } from '../service/complaint.service';
import { Customer } from '../customerDetail/customer';
import {NgForm, FormControl, FormBuilder, Validators} from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  constructor(private appMasterDataService: MasterDataService, private appComplaintService:ComplaintService,private appRegistrationService:RegistrationService) { }
  isRegistered:boolean = false;
  notRegistered:boolean = false;
  regData = [];
  cust = new Customer();
  isComplaintSubmitted:boolean = false;  
  file = null;  
  filename='';
  isSuccess:Boolean = false;
  errorMessage:string = "";

  ngOnInit() {
   
  }


	/* @imageUpload - function  called on choosing image file from Complaint Page*/
  imageUpload(event) {
     let reader = new FileReader(); 
     this.file = event.target.files[0];
  	 var myFormData = {
  	         file :null,
  	         name: ""
  	         };
  			
      reader.readAsDataURL(this.file);
      reader.onload = () => {	
            myFormData.file = reader.result.toString().split(',')[1];
            //console.log(myFormData.file );
            myFormData.name = this.file.name;
            this.filename = this.file.name;        
        };
      this.cust.image = myFormData;   
    }


  /* @checkExistingCustomer - function  called on entering Phone Number from Complaint Page*/
  checkExistingCustomer(evt){  
  this.isComplaintSubmitted = false;
  	this.isRegistered  = false;	
  	this.regData =[];
  	this.isRegistered = false;
  	if(evt.keyCode >= 48 && evt.keyCode <= 57)
  	{
  		
  		if(evt.target.value.length == 10)
  		{
  			this.appComplaintService.checkExistingCustomer(evt.target.value)
  			.subscribe(
	  			data=>
	  			{
	  				console.log(data);
	  				 this.regData = data;
	  				if(data )
	  				{
	  					//console.log(data);
	  					this.isRegistered = true;
	  					this.cust.name = data.cust_name;
	  					this.cust.address = data.cust_address;
	  					this.cust.id = data.cust_id;
              //this.cust.description = "";
	  					
	  				}
	  				else{
            console.log(this.cust);
            this.cust.name = "";
            //this.cust.flatno = "";
             //this.cust.societyname="";
             //this.cust.description = "";
	  					this.isRegistered = false;
	  					this.notRegistered = true;

	  					
	  				}
	  			}

  			);
  		}
  	}
  	else{
  		evt.preventDefault();

  		console.log(evt.defaultPrevented);
  	}
  }

  /* @complaintRegister - function  called on submitting complaint from Complaint Page*/
  complaintRegister(f:NgForm){
  		this.cust.description = f.value.complaintdescription;
  		
      if(this.notRegistered)
      {
        
        this.cust.address = this.cust.flatno +' '+ this.cust.societyname;
        this.cust.resgistrationDate = new Date();
        this.cust.registered = 'true';
        //this.cust.inputPhone = f.value.inputPhone;
        console.log(this.cust);
          this.appRegistrationService.postCustomerDetail(this.cust as Customer).subscribe(
            success=> {
                                console.log(f.value);
                                this.isSuccess = true;
                                this.errorMessage = "";              
                                this.notRegistered = false;
                                
                                this.appComplaintService.checkExistingCustomer(this.cust.inputPhone.toString())
                              .subscribe(
                              data=>
                              {
                                console.log(data);
                                this.cust.id = data.cust_id;
                                console.log(this.cust);
                                this.appComplaintService.complaintRegister(this.cust).subscribe(data=>{
                                  this.isComplaintSubmitted = true;
                                  console.log(data);
                                  this.cust.comp_id = data.comp_id;
                                 // f.resetForm();
                                });
                                f.resetForm();
                              });
                              
                        },
            error=>{ 
            console.log(error); 
            this.isSuccess = false;
            //this.handleError(error);
            
            });
      }
      else
      {
          console.log("Registered::"+this.notRegistered);
      		this.appComplaintService.complaintRegister(this.cust).subscribe(data=>{
          console.log(data);
          this.cust.comp_id = data.comp_id;
          this.isRegistered = false;
      		this.isComplaintSubmitted = true;
          //f.resetForm();
  		    });
  		    f.resetForm();
      }
      
  }

 private handleError(error: HttpErrorResponse ) {
   this.isSuccess = false;
   this.errorMessage = error.error.text; 
      
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
