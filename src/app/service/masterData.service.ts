import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'; 
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
	title = "";
	aboutHeader = "";
	servicesHeader = "";
	registrationHeader = "";
    complaintHeader = "";
	contactHeader = "";
	aboutContent = "";
	serviceObject = [];
	contactUsObject = [];
    registrationObject = [];
	


     constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            console.log(data);
            this.title = data[0].title;
            this.aboutHeader = data[0].headers.header1;
            this.servicesHeader = data[0].headers.header2;
            this.registrationHeader = data[0].headers.header3;            
            this.contactHeader = data[0].headers.header4;
            this.complaintHeader = data[0].headers.header5;
            this.aboutContent = data[0].AboutUs;
            this.serviceObject = data[0].Services;
            this.contactUsObject = data[0].ContactUs; 
            this.registrationObject = data[0].Registration;           
        });
    }

    public getJSON(): Observable<any> {
        return this.http.get("./assets/json/masterData.json")
    }
}
