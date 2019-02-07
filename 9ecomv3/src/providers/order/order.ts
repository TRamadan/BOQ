import { Http } from '@angular/http';
import { Injectable, ɵConsole } from '@angular/core';

import { User } from '../users/users';
import { RootProvider } from '../root/root';
import { CartProduct, Cart } from '../cart/cart';
import { Item } from 'ionic-angular';
import {CategoryProvider} from '../category/category';
import {Database} from '../database';
import { Product } from '../product/product';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Order extends RootProvider {
  user: User;
  db: Database;
  catProv : CategoryProvider;
  private getUserOrderActionString: string ="get_user_orders?"
  private orderApiConntroller = "orders/";
  private addOrderActionString = "add_order?";
  private addItemOrderActionString = "add_item_to_order?";


  orderData: OrderData;


  constructor(http : Http) {

    super(http);

    this.catProv = new CategoryProvider(http);
    
  }
  public async sendOrder(userId:string,addressId:string,totalPrice:number) :Promise<any>{
   
    
    let status = "10" //10 for pending
    let temp = `${RootProvider.APIURL4}${this.orderApiConntroller}${this.addOrderActionString}CustomerId=${userId}&BillingAddressId=${addressId}&OrderStatusId=${status}&ShippingStatusId=${status}&PaymentStatusId=${status}&OrderSubtotalInclTax=${totalPrice}&OrderSubtotalExclTax=${totalPrice}&OrderTotal=${totalPrice}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        console.log(data);
        if(data !=undefined && data.length>0){
         resolve(data[0].Id);  
          
        }else{
        resolve("-1");
      }
      },err=>{
        console.log(err);
        resolve("-2");
      })
    })
  }

  public async orderItem(orderId:string,itemId:string,quantity:number,itemprice:number,totalPrice):Promise<any>{
    let temp = `${RootProvider.APIURL4}${this.orderApiConntroller}${this.addItemOrderActionString}OrderId=${orderId}&ProductId=${itemId}&Quantity=${quantity}&UnitPriceInclTax=${itemprice}&UnitPriceExclTax=${itemprice}&PriceInclTax=${totalPrice}&PriceExclTax=${totalPrice}`;
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        resolve(data)
      },err=>{
        resolve(err);
      })
    })
  }

 



 


  public async getUserOrders (userId:string) : Promise<any>{
    this.db= Database.getInstance();
    let categories= this.db.categories;
    let items = new Array();
    for(let i = 0 ;i<categories.length;i++){
      let tempArr = new Array<Product>();
        tempArr =this.catProv.getCateItem(categories[i],tempArr);
       
        items.push(...tempArr);

    }
    
    return new Promise((resolve)=>{
      let str = `${RootProvider.APIURL4}${this.orderApiConntroller}${this.getUserOrderActionString}CustomerId=${userId}`;
      
      this.http.get(str).map(res=><any>res.json()).subscribe(data=>{
        let Orders= new Array<OrderData>();
        if(data != null && data.length != 0){
          
          let counter=0;
          for(let i = 0 ; i <data.length ; i=i+1+counter){
            let orderItems = new Array<OrderItem>();
            counter=0;
            
            for(let j=i;j<data.length;j++)
            {
              
              if(data[j].Id == data[i].Id){
                counter++
               
                for(let k=0 ; k<items.length;k++){
                  if(items[k].id == data[j].ProductId){
                    orderItems.push(new OrderItem(data[j].ProductId,items[k].image1,data[j].UnitPriceInclTax,data[j].Quantity,items[k].name));
                  }
                }
              }
              
              
            }

            Orders.push(new OrderData(data[i].Id,data[i].CreatedOnUtc,data[i].OrderGuid,data[i].OrderTotal,data[i].ShippingStatusId,orderItems));
           
           
          }
         
        }
        console.log(Orders);
        resolve(Orders);
      
      },err=>{
        resolve(err);
      })
    })
  }


}
export class OrderData {
  ID: string;
  createdOn: string;
  Guid: string;
  totalPrice: number;
  statusId:string;
  Items: Array<OrderItem>;
  constructor(Id
    ,createdOn
    ,Guid
    ,totalPrice
    ,statusId
    ,items
  ){
    this.ID=Id;
    this.createdOn=createdOn;
    this.Guid = Guid;
    this.totalPrice=totalPrice;
    this.statusId = statusId;
    this.Items = items;
  }
}

export class OrderItem{
  id:string;
  image: string;
  price: number;
  Quantity: number;
  name: string;
  constructor(id,image,price,quantity,name){
    this.id=id;
    this.image=image;
    this.price=price;
    this.Quantity=quantity;
    this.name=name;
  }
}

