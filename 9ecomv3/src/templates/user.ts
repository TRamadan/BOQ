export class User {
    id :string;
    name : string;
    gender : string;
    addresses : Address[];
    password : string;
    email :string;
    phone :string ;

    constructor(id :string="-1",name : string ="", gender : string = "ذكر" , address: Address[] = new Array() ,password :string ="" ,email : string = "" , phone :string =""){
        this.id= id;
        this.name =name;
        this.gender = gender
        this.addresses = new Array();
        this.addresses = address;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }

    public addSavedAddress(address :Address){
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
export class Address{
    houseNum: string;
    street : string ;
    Block: string;
    district: string;
    city: string; 
    country: string;

    constructor(houseNum="",street="",block="",district="",city="",country=""){
        this.houseNum = houseNum;
        this.street = street;
        this.Block = block;
        this.district = district;
        this.city = city;
        this.country = country;
    }
}
