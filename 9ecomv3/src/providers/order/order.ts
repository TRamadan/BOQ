import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Order {
  id: string;
  date: Date;
  status: string;
  orderAPi : string ="";

  orderData : {
    userId : string,
    paymentId : string,
    shippingId : string,
    totalPrice : number,
    invoice_id :string,
    orderDate  : Date,
    deleveryAddress : String,
    deleveryLong : number,
    deleverLatt : number,
    items : [{
      itemId : string,
      quantity : string
    }]

    http :Http



  }
  
  constructor(id :String ,date :Date = new Date() ,status: string  ) {
 
  }

  addOrder(){

  }

  
}

