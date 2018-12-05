import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../service/masterData.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
	

  constructor(private appMasterDataService: MasterDataService) { }

  ngOnInit() {

  }

}
