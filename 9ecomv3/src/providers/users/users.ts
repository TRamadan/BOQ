import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider extends RootProvider {
  private logIn: string = "MobileUserLogin";
  private logIn2: string = "users";
  private register: string = "AddNewUser";
<<<<<<< HEAD
  public user: User; 
  public register2 : string = "users";
=======
  private register2: string = "users";
  public user: User;
>>>>>>> 4981a318977b52cd33bff4d259af016e70bac67f

  constructor(public http: Http, public storage: Storage) {
    super(http);
    this.user = User.getInstance();
  }

 
  public async login(name: string, password: string) : Promise<any> {
    return new Promise((resolve)=>{
      let temp = `${RootProvider.APIURL3}${this.logIn2}?user_name=${name}&user_password=${password}`;
      //console.log(temp);
      this.http.get(temp).map(res => <any>res.json()).subscribe(data=>{
          if(data != null)

        {  if(data.length > 0){
          let tempGender = data[0].user_type==1 ? 'Male': 'Female'; 
          this.user = User.getInstance(data[0].id,data[0].user_name,tempGender,data[0].user_password,data[0].user_email,data[0].user_phone,data[0].user_last_name,data[0].user_first_name);
          console.log(User.getInstance());
          this.storage.set('user', this.user); 
          //console.log(data);
          resolve(true);
          
        } 
        else{
          alert("Worng User Name Or Password");
          resolve(false);
        }

      }
      },err=>{
        alert(err);
         resolve(false);
      });
  
    })
    
   
  }

  public async Regester(userName:string,password:string,fname:string,lname:string,userImage:string,userPhone:string,userEmail:string,usertype:string): Promise<any> {
    let temp = `${RootProvider.APIURL3}${this.register2}?user_name=${userName}&user_password=${password}&user_first_name=${fname}&user_last_name=${lname}&user_img=""&user_phone=${userPhone},&user_email=${userEmail}&user_type=${usertype}`;
    //console.log(temp);
    
    return new Promise ((resolve)=>{
    this.http.get(temp).map(res => <any>res.json()).subscribe(data=>{
      console.log(data);
      if (data.length > 0) {
        if(data[0].error_name == "done"){
          let temp =this.login(userName,password);
          resolve(true && temp);
        }else{
          alert("this Email has been regestered before")
          resolve(false);

        }
      } else {
        alert("Server Error");
        resolve(false)
      }
    }, err => {
      alert(err);
      resolve(false)
    })
    })
    
  }
  

  public getUser(){
    return User.getInstance();
  }

  public addAddress(address : Address){

    this.user.addSavedAddress(address);
    this.storage.set('user' , this.user)
    
  }
  public removeAddress(address : Address){
    this.user.removeSavedAddress(address);
    this.storage.set('user',this.user);
  }




}









export class User {
  id: string;
  name: string;
  fName:string;
  lName:string;
  gender: string;
  addresses: Address[];
  password: string;
  email: string;
  phone: string;
  image : string; 

  
  private static instance: User = null;
  static isCreating: boolean = false;

<<<<<<< HEAD
  constructor(id: string = "-1", name: string = "", gender: string = "ذكر", password: string = "", email: string = "", phone: string = "",lName :string ="",fName: string = "",address: Address[] = new Array() , image : string = "") {
=======
  constructor(id: string = "-1", name: string = "", gender: string = "Male", password: string = "", email: string = "", phone: string = "",lName :string ="",fName: string = "",address: Address[] = new Array()) {
>>>>>>> 4981a318977b52cd33bff4d259af016e70bac67f
   
    if (User.isCreating) {
      throw new Error("An Instance Of User Singleton Already Exists");
    } else {
      this.setData(id, name, gender, password, email, phone,address);
      User.isCreating = true;
    }
  }

  public setData(id: string = "-1", name: string = "", gender: string = "Male", password: string = "", email: string = "", phone: string = "", address: Address[] = new Array()) {
    
    this.id = id;
    this.name = name;
    this.gender = gender
    this.addresses = new Array();
    this.addresses = address;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  static getInstance(id: string = "-1", name: string = "", gender: string = "ذكر",  password: string = "", email: string = "", phone: string = "",fName:string="",lName:string="",address: Address[] = new Array()) {
    if (User.isCreating === false && id !="-1") {
      //User.isCreating = false;
      User.instance = new User(id, name, gender, password, email, phone,lName,fName, address);
      console.log(console.log(User.instance));
    }
    if (id != "-1") {
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

  toString(): string{
    return this.houseNum + "," + this.street + "," + this.Block + "," + this.district + "," + this.city + "," + this.country;
  }
}

