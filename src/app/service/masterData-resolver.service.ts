import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { MasterDataService } from './masterData.service';

@Injectable()
export class MasterDataResolver implements Resolve<any>{

	public viewData:any;
	
	constructor(public appMasterDataService: MasterDataService, private router:Router){}

	resolve(ar:ActivatedRouteSnapshot, st:RouterStateSnapshot ):Observable<any>{
				return this.appMasterDataService.getJSON();
				
        		
	}
}