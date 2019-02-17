import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
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
  private register2: string = "users";

  private userApiController:string = 'users/';
  
  private logInActionString = "user_login?";
  private regesterActionString = "user_reg?";
  private getSaltActionString = "get_salt?";
  private customerRoleActionString = "custmoer_role?";
  private addPhonenumber = "add_phone?";

  private addressApiController = "address/";
  private addAddressActionString = "add_address?"

  private stateApiController = "State/";
  private getStatesActionString = "get_states?";

  private addressUserLinkActionString = "link_user_address?";

  private getUserAddressActionString = "get_user_address?";

  private rateApiController = 'product/';
  private rateActionString = "add_review?";

  public user: User; 

  

  constructor(public http: Http, public storage: Storage) {
    super(http);
    this.user = User.getInstance();
  }

  public async RegesterNop(Username:string,password:string,email:string,PhoneNumber:string): Promise<any>{
    return new Promise((resolve)=>{
      let date = new Date();
      console.log(date);
      let F = false;
      let T = true;
      let temp = `${RootProvider.APIURL4}${this.userApiController}${this.regesterActionString}Username=${email}&Email=${email}&Password=${password}&PasswordFormatId=1&IsTaxExempt=${F}&AffiliateId=0&VendorId=0&HasShoppingCartItems=${F}&Active=${T}&Deleted=${F}&IsSystemAccount=${F}&LastActivityDateUtc=${date.toJSON()}`;
      console.log(temp);
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        console.log(data);
        if(data != null && data != undefined && data.length>0){
          let customerRoleTemp= `${RootProvider.APIURL4}${this.userApiController}${this.customerRoleActionString}customer_id=${data[0].ID}`;
          this.http.get(customerRoleTemp).map(res=><any>res.json()).subscribe(d2=>{
            console.log(d2);
          })
          let customerPhoneTemp= `${RootProvider.APIURL4}${this.userApiController}${this.addPhonenumber}EntityId=${data[0].ID}&Value=${PhoneNumber}`;
          console.log(customerPhoneTemp);
          this.http.get(customerPhoneTemp).map(res=><any>res.json()).subscribe(data=>{
            console.log(data);
          })
          this.user = User.getInstance(data[0].ID,Username,password,email);
          resolve(data[0].ID);

        }else{
          resolve("-1")
        }
      })
    })
  }

  public async loginNop(email:string,password:string,salt:any): Promise<any>{
    return new Promise((resolve)=>{
      let temp = `${RootProvider.APIURL4}${this.userApiController}${this.logInActionString}Email=${email}&Password=${password}&salt=${salt}`;
      console.log(temp);
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        if(data != null && data != undefined && data.length>0){
          console.log(data[0].Id+ "  : "+data[0].Username+"  :  "+data[0].Password+"  :  "+data[0].Email)
          this.user = User.getInstance(data[0].Id,data[0].Username,data[0].Password,data[0].Email);
          console.log(this.user);
          resolve(true);
        }else{
          resolve(false)
        }
      })
    })
  }

  

 
 
  public async getSualt(email:string){
    let temp =`${RootProvider.APIURL4}${this.userApiController}${this.getSaltActionString}Email=${email}&Username=""`
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        if(data){
          resolve(data[0].PasswordSalt);
        }else{
          resolve(-1);
        }
      },err=>{
        console.log(err);
        resolve(-1)
      })
    })
  }

  public async getState() :Promise<any>{
    let temp = `${RootProvider.APIURL4}${this.stateApiController}${this.getStatesActionString}`; 
    let states = new Array<state>();
    
    return new Promise ((resolve)=>{
      this.http.get(temp).map(res => <any>res.json()).subscribe(data => {
        console.log(data);
        if(data != undefined && data.length > 0)
        {
          for(let i =0;i<data.length;i++){
            states.push(new state(data[i].Id,data[i].CountryId,data[i].Name));
          }
          
          resolve(states)
        }else{ 
          
          resolve([]);
        }
      },err =>{
       console.log(err);
        resolve([]);
      }
    )
    })
  }

  public getStateById(states:Array<state>,id:string): state{
    let chosen ;
    states.forEach(element => {
      if(element.id == id){
        chosen = element;
      }
      
    });
    return chosen
  }

  public getStateByName(states:Array<state>,name:string):state{
    let chosen ;
    states.forEach(element=>{
     
      if(element.name.toLowerCase() === name.toLowerCase())
      { console.log(element.name.toLowerCase() === name.toLowerCase());
        chosen = element;
      }
    });
    return chosen;
  }

  

  public getUser(){
    return User.getInstance();
  }

  public async addAddress(address : Address , zipCode : string,email:string ,stateId :string,userId:string):Promise<any>{

    let temp = `${RootProvider.APIURL4}${this.addressApiController}${this.addAddressActionString}Email=${email}&Company=""&StateProvinceId=${stateId}&Address1=${address.toString()}&Address2=""&ZipPostalCode=${zipCode}&PhoneNumber=""&FaxNumber=""`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        console.log(data.length);
        if(data!=undefined && data.length>0){
          address.id=data[0].ID;
          this.user =this.getUser();
          this.user.addSavedAddress(address);
          this.storage.set('user' , this.user);
          let userLinkApi=`${RootProvider.APIURL4}${this.addressApiController}${this.addressUserLinkActionString}Customer_Id=${userId}&Address_Id=${address.id}`;
          console.log(userLinkApi);
          this.http.get(userLinkApi).map(res=><any>res.json()).subscribe(data=>{
            console.log(data);
            resolve(address.id);
          })
          
        }
        resolve(null)
      })
      resolve(null);
    })
      
    
  }

  public async getAddress(userId:string):Promise<any> {
    let temp=`${RootProvider.APIURL4}${this.addressApiController}${this.getUserAddressActionString}Customer_Id=${userId}`
    console.log(temp);
    return new Promise((resolve)=>{
      
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        console.log(data);
        let userAddress = new Array<Address>();
        if(data != undefined && data.length > 0){
          
          for(let i = 0 ;i < data.length ; i++){
            userAddress.push(new Address());
            userAddress[i].fromString(data[i].Address1);
            userAddress[i].id=data[i].Address_Id;
            userAddress[i].zipCode=data[i].ZipPostalCode;
          }
          this.user = this.getUser();
          console.log(this.user);
          this.user.addresses = userAddress;
          resolve(userAddress);
          
        }else{
          resolve(userAddress);
        }

      }),err=>{
        resolve(err);
      }
      
    })
  }


  public async rate(productId,rate,title,body){
    let temp=`${RootProvider.APIURL4}${this.rateApiController}${this.rateActionString}CustomerId=${this.user.id}&ProductId=${productId}&Rating=${rate}&Title=${title}&ReviewText=${body}`;
    console.log(temp); 
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        resolve(data);

      },err=>{
        resolve(err);
      })
    })
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

  constructor(id: string = "-1", name: string = "", gender: string = "Male", password: string = "", email: string = "", phone: string = "",lName :string ="",fName: string = "",address: Address[] = new Array()) {
   
    if (User.isCreating) {
      throw new Error("An Instance Of User Singleton Already Exists");
    } else {
      this.setData(id, name, password, email,gender, phone,address);
      User.isCreating = true;
    }
  }

  public setData(id: string = "-1", name: string = "", password: string = "", email: string = "", gender: string = "Male", phone: string = "", address: Address[] = new Array()) {
    
    this.id = id;
    this.name = name;
    this.gender = gender
    this.addresses = new Array();
    this.addresses = address;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  static getInstance(id: string = "-1", name: string = "",  password: string = "", email: string = "",gender: string = "ذكر", phone: string = "",fName:string="",lName:string="",address: Address[] = new Array()) {
    if (User.isCreating === false && id !="-1") {
      //User.isCreating = false;
      User.instance = new User(id, name, gender, password, email, phone,lName,fName, address);
      console.log(console.log(User.instance));
    }
    if (id != "-1") {
      User.instance.setData(id, name,password, email,gender, phone,address);
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
  id:string;
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
  fromString(address : string){
     let temp = new Array();
     let start = 0 ;
     let end = 0;
     for(let i = 0; i<=address.length;i++){
       if(address[i] == ','){
         temp.push(address.slice(start,i))
         start=i+1;
       }
       if(i == address.length){
        temp.push(address.slice(start,i));
       }
       
     }
     this.houseNum = temp[0];
     this.street = temp[1];
     this.Block = temp[2];
     this.district = temp[3];
     this.city = temp[4];
     this.country = temp[5];
  }
}

export class state{
  public id : string;
  public countryId: string
  public name : string;
  constructor(id:string,counteryId,name:string){
    this.id=id;
    this.countryId=counteryId;
    this.name=name;

  }
}

