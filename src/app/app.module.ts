import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesComponent } from './services/services.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MasterDataService } from './service/masterData.service';
import { Customer } from './customerDetail/customer';

import { MasterDataResolver } from './service/masterData-resolver.service';

import { RegistrationService } from './service/registration.service';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintService } from './service/complaint.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    ServicesComponent,
    RegistrationComponent,
    ComplaintComponent,
    FileSelectDirective,
    ContactusComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule
  ],
  providers: [FormsModule,
  MasterDataService,
  MasterDataResolver,
  Customer,
  RegistrationService,
  ComplaintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
