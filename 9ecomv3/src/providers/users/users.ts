import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider extends RootProvider {
  private logIn: string = "MobileUserLogin";
  private register: string = "AddNewUser";
  public user: User;

  constructor(public http: Http, public storage: Storage) {
    super(http);
    this.user = User.getInstance();
  }

 
  public async login(email: string, password: string) : Promise<any> {
    return new Promise((resolve,reject)=>{
      this.http.get(`${RootProvider.APIURL}${this.logIn}?user_email=${email}&user_pwd=${password}`).map(res => <any>res.json()).subscribe(data=>{
        if(data.length >0){
          let tempGender = data[0].UserGender==1 ? 'Male': 'Female'; 
          this.user = User.getInstance(data[0].UserID,data[0].UserName,tempGender,data[0].UserAddress,data[0].UserPwd,data[0].UserEmail,data[0].UserMobile);
          this.storage.set('user', this.user); 
          console.log(data);
          resolve(this.user);
          
        }else{
          alert("Worng User Name Or Password");
          reject(null);
        }
      },err=>{
        alert(err);
         reject(null);
      });
  
    })
    
   
  }

  public Regester(email: string, password: string, name: string, gender: string, location: string, phone: string): any {
    let tempGender = (gender == "ذكر") ? 1 : 2;

    this.http.get(`${RootProvider.APIURL}${this.register}?user_email=${email}&user_pwd=${password}&mobile=${phone}&fname=${name}&home_address=${location}&gender=${tempGender}`).map(res => <any>res.json()).subscribe(data=>{
      if (data.length > 0) {
        this.user = User.getInstance(data[0].USERID,name, gender,password,email,phone)
       // console.log(this.user);
        this.storage.set('user', this.user);
        return true;
      } else {
        alert("Server Error");
        return false
      }
    }, err => {
      alert(err);
      return false
    })
  }
  

  public getUser(){
    return this.user;
  }

  public addAddress(address : Address){
    this.storage.get('addresses').then(data=>{
      this.user.addresses = data;
      this.user.addSavedAddress(address);
     this.storage.set('addresses' , this.user.addresses)
    })
    
  }




}









export class User {
  id: string;
  name: string;
  gender: string;
  addresses: Address[];
  password: string;
  email: string;
  phone: string;

  userProvider: UsersProvider;

  private static instance: User = null;
  static isCreating: boolean = false;

  constructor(id: string = "-1", name: string = "", gender: string = "ذكر", password: string = "", email: string = "", phone: string = "",address: Address[] = new Array()) {
    console.log(this.userProvider);
    if (!User.isCreating) {
      throw new Error("An Instance Of User Singleton Already Exists");
    } else {
      this.setData(id, name, gender, password, email, phone,address);
      User.isCreating = true;
    }
  }

  public setData(id: string = "-1", name: string = "", gender: string = "ذكر", password: string = "", email: string = "", phone: string = "", address: Address[] = new Array()) {
    this.id = id;
    this.name = name;
    this.gender = gender
    this.addresses = new Array();
    this.addresses = address;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  static getInstance(id: string = "-1", name: string = "", gender: string = "ذكر",  password: string = "", email: string = "", phone: string = "",address: Address[] = new Array()) {
    console.log('Database Provider');
    if (User.instance === null) {
      User.isCreating = true;
      User.instance = new User(id, name, gender, password, email, phone, address);
      User.isCreating = false;
    }
    if (id == "-1") {
      User.instance.setData(id, name, gender,password, email, phone,address);
    }
    return User.instance;
  }

  public addSavedAddress(address: Address) {

    this.addresses.push(address);


  }

  public removeSavedAddress(u: Address): void {
    let pos = -1;
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] === u) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.addresses.splice(pos, 1);
    }
  }


}
export class Address {
  houseNum: string;
  street: string;
  Block: string;
  district: string;
  city: string;
  country: string;
  zipCode: string;

  constructor(houseNum = "", street = "", block = "", district = "", city = "", country = "", zipCode = "") {
    this.houseNum = houseNum;
    this.street = street;
    this.Block = block;
    this.district = district;
    this.city = city;
    this.country = country;
    this.zipCode = zipCode
  }
}

