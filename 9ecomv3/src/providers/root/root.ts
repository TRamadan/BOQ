import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RootProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RootProvider {
  public APIURL = "http://services.edge-techno.com/BOQMobilApi/api/APP/"; 
  
  public APIURL2 = "http://services.edge-techno.com/BOQAPI/api/";
  
  public APIURL3 = "http://localhost:37871/api/";
  
  constructor(public http: Http) {
    console.log('Hello RootProvider Provider');
  }

}
