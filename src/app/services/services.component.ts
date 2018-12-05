import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../service/masterData.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
public showExtd:boolean = false;
public showRepair:boolean = false;
public showEwaste:boolean = false;
public showResale:boolean = false;
extdWarrantyContent = "";
repairContent = "";
ewasteContent = "";
resaleContent = "";



  constructor(private appMasterDataService: MasterDataService) { }

  ngOnInit() {
  
  }

   onClickExtd()
  {
  	this.showExtd = true;
  	this.showRepair = false;
  	this.showEwaste = false;
  	this.showResale = false;  	
  };

	getColor(boo:boolean){
		let strcolor = "#109173";
		if(boo == true)
		{
			strcolor = "orange";
		}
		else
		{
			strcolor = "#109173";
		}
		
		return strcolor;
	}

   onClickRepair()
  {
  	
  	this.showRepair = true;
  	this.showExtd = false;  	
  	this.showEwaste = false;
  	this.showResale = false;
  	
  };

  onClickEwaste()
  {
  	
  	this.showExtd = false;
  	this.showRepair = false;
  	this.showEwaste = true;
  	this.showResale = false;
  	
  };

   onClickResale()
  {
  	
  	this.showExtd = false;
  	this.showRepair = false;
  	this.showEwaste = false;
  	this.showResale = true;
  }
}
