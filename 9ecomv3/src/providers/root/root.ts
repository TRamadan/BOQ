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
  public static APIURL = "http://services.edge-techno.com/BOQMobilApi/api/APP/"; 
  
  public static APIURL2 = "http://services.edge-techno.com/BOQAPI/api/";
  
  public static APIURL3 = "http://nemooo-001-site1.atempurl.com/api/";

  public static APIURL4 = "http://edge2018-001-site2.gtempurl.com/api/";

  public static imageUrl = "http://nemo0o-001-site1.gtempurl.com/";
  
  constructor(public http: Http ) {                                                         
    console.log('Hello RootProvider Provider');
  }
 
}
