export class User {
    id :string;
    name : string;
    gender : string;
    location : string ;
    password : string;
    email :string;
    phone :string ;

    constructor(id :string="-1",name : string ="", gender : string = "ذكر" , location : string = "",password :string ="" ,email : string = "" , phone :string =""){
        this.id= id;
        this.name =name;
        this.gender = gender
        this.location = location;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }
}