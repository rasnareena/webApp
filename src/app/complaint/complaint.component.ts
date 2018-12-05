import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../service/masterData.service';
import{ ComplaintService } from '../service/complaint.service';
import { Customer } from '../customerDetail/customer';
import {NgForm, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  constructor(private appMasterDataService: MasterDataService, private appComplaintService:ComplaintService) { }
  isRegistered:boolean = false;
  regData = [];
  cust = new Customer();
  isComplaintSubmitted:booleam = false;  
  file = null;  
  filename='';


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
          myFormData.file = reader.result;
          myFormData.name = this.file.name;
          this.filename = this.file.name;        
      };
    this.cust.image = myFormData;
   
    }


    /* @checkExistingCustomer - function  called on entering Phone Number from Complaint Page*/
  checkExistingCustomer(evt){  
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
	  					
	  				}
	  				else{
	  					this.isRegistered = false;
	  					
	  					
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
  		console.log(this.cust);
  		this.appComplaintService.complaintRegister(this.cust).subscribe(data=>{
  		this.isComplaintSubmitted = true;
  		});
  		

  }

}
