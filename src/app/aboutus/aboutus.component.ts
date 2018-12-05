import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../service/masterData.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private appMasterDataService: MasterDataService) { }

  ngOnInit() {
  	//console.log(this.appMasterDataService.aboutContent);
  }

}
