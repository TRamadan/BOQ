import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider extends RootProvider {

  constructor(public http: Http) {
    super(http);
  } 

  private logIn : string ="MobileUserLogin";
  private register : string = "AddNewUser"; 

  public login(email : string , password : string) : Observable<any>{
    return this.http.get(`${RootProvider.APIURL}${this.logIn}?user_email=${email}&user_pwd=${password}`).map(res=><any>res.json());

  }

  public Regester(email :string , password :string , name :string ,gender : string , location :string , phone: string ) : Observable<any>{
    let tempGender = (gender =="ذكر")? 1:2;
    return this.http.get(`${RootProvider.APIURL}${this.register}?user_email=${email}&user_pwd=${password}&mobile=${phone}&fname=${name}&home_address=${location}&gender=${tempGender}`).map(res=><any>res.json())
  }


}
