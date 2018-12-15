import { Component, OnInit } from '@angular/core';
import {NgForm, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MasterDataService } from '../service/masterData.service';
import { RegistrationService } from '../service/registration.service';
import { CustomerDetailService } from '../service/customerDetail.service';
import { Customer } from '../customerDetail/customer';
//import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import {  ActivatedRoute, Router } from '@angular/router';


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
 
 selectedIndex:number = -1;
 selectedSociety:boolean = false;
  selectedProject = [];
 selectedBuilding = [];

  constructor(private formBuilder:FormBuilder, private appMasterDataService: MasterDataService ,
  private appCustomerDetailService:CustomerDetailService, private appRegistrationService:RegistrationService, private route:ActivatedRoute, private router:Router) { 

  }

  ngOnInit() {
       
    this.initialize();
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
          myFormData.name = this.file.name;                
      };
    this.cust.image = myFormData;
   
    }

    /* @initialize - function  called on Registration Page when registration URL contains society names NandedCity and Magarpatta*/
    initialize(){
      if((this.router.url).includes('magarpatta'))
        {
            this.selectedIndex  = 1;
            this.selectedSociety = true;
            this.cust.societyname = 'Magarpatta';
             
        }
        else if((this.router.url).includes('nandedcity'))
        {
          this.selectedIndex  = 0;
          this.selectedSociety = true;
          this.cust.societyname = 'NandedCity';
          
        }
        else{
        this.selectedIndex  = -1;
        this.selectedSociety = false;
        }
        //console.log(this.selectedIndex);
        //console.log(this.cust.societyname);
        this.selectedProject = this.appMasterDataService.registrationObject.society[this.selectedIndex].project;
        this.cust.projectname = this.selectedProject[0].name;
        this.selectedBuilding = this.selectedProject[0].buildingno;
        this.cust.buildingno = this.selectedProject[0].buildingno[0];
  }

  /* @onCityChanged - function  called on Registration Page when registration URL contains society names NandedCity and Magarpatta
  onCityChanged(val:any){
    console.log(val);
    console.log(this.masterData[val].project);
    this.selectedProject = this.masterData[val].project;
     this.selectedBuilding = this.selectedProject[0].buildingno;
  }*/

  /* @onProjectChanged - function called on Registration Page when projectname dropdown changes to populate building numbers*/
  onProjectChanged(val:any){
      this.selectedBuilding = this.selectedProject[val].buildingno;
      console.log(this.selectedBuilding );
      this.cust.buildingno = this.selectedProject[val].buildingno[0];
  }

  /* @register - function  called on submitting customer detains from Registration Page*/   
register(f:any)
{    
  //console.log(f);
  if(this.selectedIndex==-1) {     
    this.cust.address = this.cust.flatno +' '+this.cust.societyname;   
  }   
  else   
  {    
    this.cust.address = this.cust.flatno+' '+ this.cust.buildingno+ ', '+this.cust.projectname+ ', '+this.cust.societyname; 
  }
  
  this.cust.resgistrationDate = new Date();
  this.cust.registered = 'true';
  console.log(this.cust);
  this.appRegistrationService.postCustomerDetail(this.cust as Customer).subscribe(
      success=> {this.isSuccess = true;
                  this.errorMessage = "";},
      error=>{  
      this.isSuccess = false;
      this.handleError(error);
      
      });  
 
      if(this.selectedIndex!=-1)
      {
        
        f.controls.name.reset();
        f.controls.inputPhone.reset();
        f.controls.flatno.reset();
        this.initialize();    
        
      }
      else
      {
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
