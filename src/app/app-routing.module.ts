import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutusComponent } from './aboutus/aboutus.component';
import { ServicesComponent } from './services/services.component';
import { RegistrationComponent } from './registration/registration.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ContactusComponent } from './contactus/contactus.component';

import { MasterDataResolver } from './service/masterData-resolver.service';


export const appRoutes:Routes = [
	{ 	path:'', 
		component: AboutusComponent, resolve:{res:MasterDataResolver}
	},
	{ 	path:'service', 
		component: ServicesComponent, resolve:{res:MasterDataResolver}
	},
	{ 	path:'registration', 
		component: RegistrationComponent, resolve:{res:MasterDataResolver},
		children:[
				{path:'society/:name', component:RegistrationComponent}
		]
	}
	,
	{ 	path:'complaint', 
		component: ComplaintComponent, resolve:{res:MasterDataResolver}
	},
	{ 	path:'contact', 
		component: ContactusComponent, resolve:{res:MasterDataResolver}
	}
];

@NgModule({
	imports: [	
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{}