import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from '../users/users';
import { RootProvider } from '../root/root';
import { CartProduct } from '../cart/cart';
import { resolve } from 'url';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Order extends RootProvider {
  user: User;
  orderAPi: string = "main";
  getUserOrderApi: string ="users"

  orderData: OrderData;

  constructor(http : Http) {
    super(http);
    this.user = User.getInstance();
  }

 



  public async addOrder(totalPrice : number
    ,deleveryAddress:string
    ,items : Array<CartProduct>
    ,paymentId :string ='1'
    ,shippingId : string = '1'
    ,long : string ='0'
    ,latt : string ='0'
  ) : Promise<any> {

    this.orderData = new OrderData(this.user.id,paymentId,shippingId,totalPrice,new Date(),deleveryAddress,long,latt,items);
    let count = 0;
    for(let i = 0;i<this.orderData.items.length;i++){
      let totalItemPrice= this.orderData.items[i].product.price * this.orderData.items[i].quantity;
      let bool = await this.sendSingleItem(this.orderData.items[i].product.distributerLinkId ,this.orderData.items[i].quantity,totalItemPrice);
      if(bool == true){
        count++;
      }
    }
    console.log(count)
    console.log(this.orderData.items.length)
    return new Promise((resolve)=>{
      if(count == this.orderData.items.length){
        console.log("all orders sent");
        resolve (true);
      }
      resolve(false)
    })
    
    

    
  }

  private async sendSingleItem(itemId:string,quantity: number,totalItemPrice) :Promise<any>{
    return new Promise((resolve)=>{
      
      let str = `${RootProvider.APIURL3}${this.orderAPi}?item_id=${itemId}&user_id=${this.orderData.userId}&payment_id=${this.orderData.paymentId}&shipping_id=${this.orderData.shippingId}&quantity=${quantity}&total_price=${totalItemPrice}&invoice_id=${this.orderData.invoiceId}&order_datetime=${this.orderData.orderDate.toJSON()}&deliver_address=${this.orderData.deleveryAddress}&deliver_long=${this.orderData.deleveryLong}&deliver_latt=${this.orderData.deleverLatt}`;
      console.log(str);
      this.http.get(str).subscribe(data=>{
        
        resolve(true)
      },err=>{
        console.error(err);
        resolve(false);
      }
      )
    })
  }


  public async getUserOrders(userId:string) : Promise<any>{
    return new Promise((resolve)=>{
      let str = `${RootProvider.APIURL3}${this.getUserOrderApi}?user_id=${userId}`;
      console.log(str);
      this.http.get(str).map(res=><any>res.json()).subscribe(data=>{
        if(data != null && data.length != 0){
          console.log(data);
          let Orders= new Array<OrderData>();
          for(let i = 0 ; i <data.length ; i++){
            Orders.push(new OrderData(userId,data[i].payment_id,data[i].shipping_id,data[i].total_price,data[i].order_datetime,data[i].deliver_to,data[i].deliver_long,data[i].deliver_latt,new Array<CartProduct>()));
            
          }
          resolve(Orders);
        }
      },err=>{
        resolve(err);
      })
    })
  }


}
export class OrderData {
  userId: string
  paymentId: string
  shippingId: string
  totalPrice: number
  invoiceId: string
  orderDate: Date
  deleveryAddress: String
  deleveryLong: string
  deleverLatt: string
  items: Array<CartProduct>;

  constructor(userId:string
    ,paymentId:string
    ,shippingId:string
    ,totalPrice:number
    ,orderDate: Date
    ,deleveryAddress:string
    ,deleveryLong:string
    ,delevertlatt:string
    ,items:Array<CartProduct>
  ){
    this.items = new Array<CartProduct>();
    this.items = items;
    this.userId= userId;
    this.paymentId= paymentId;
    this.shippingId=shippingId;
    this.totalPrice= totalPrice;
    this.invoiceId= this.genrateInvoiceId(orderDate);
    this.orderDate= orderDate;
    this.deleveryAddress= deleveryAddress;
    this.deleveryLong= deleveryLong;
    this.deleverLatt= delevertlatt;
  }

  private genrateInvoiceId(date : Date) : string{
    
    let Rand = Math.floor(Math.random() *1000);
    return Rand.toString();
    //return this.user.id +  date.getMinutes().toString()+date.getHours().toString() + date.getSeconds().toString() + Rand;

  }
}

