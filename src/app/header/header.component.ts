import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../service/masterData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private appMasterDataService: MasterDataService) { }

  ngOnInit() {
  	
  }

}
