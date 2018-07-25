import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../users/users';
import { RootProvider } from '../root/root';
import { CartProduct } from '../cart/cart';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Order extends RootProvider {
  user: User;
  orderAPi: string = "main";

  orderData: OrderData;

  constructor(http : Http) {
    super(http);
    this.user = User.getInstance();
  }

  private genrateInvoiceId(date : Date) : string{
    
    let Rand = Math.floor(Math.random() *1000);
    return Rand.toString();
    //return this.user.id +  date.getMinutes().toString()+date.getHours().toString() + date.getSeconds().toString() + Rand;

  }



  public async addOrder(totalPrice : number
    ,deleveryAddress:string
    ,items : Array<CartProduct>
    ,paymentId :string ='0'
    ,shippingId : string = '0'
    ,long : string ='0'
    ,latt : string ='0'
  ) : Promise<any> {
    this.orderData = new OrderData();
    this.orderData.orderDate = new Date();
    this.orderData.invoiceId = this.genrateInvoiceId(this.orderData.orderDate);
    this.orderData.userId = this.user.id;
    this.orderData.totalPrice = totalPrice;
    this.orderData.deleveryAddress = deleveryAddress ;
    this.orderData.items = items;
    this.orderData.paymentId = paymentId;
    this.orderData.shippingId = shippingId;
    this.orderData.deleverLatt = latt;
    this.orderData.deleveryLong = long;
    let count = 0;
    for(let i = 0;i<this.orderData.items.length;i++){
      let bool = await this.sendSingleItem(this.orderData.items[i].product.id ,this.orderData.items[i].quantity);
      if(bool == true){
        count++;
      }
    }
    console.log(count)
    console.log(this.orderData.items.length)
    return new Promise((resolve,reject)=>{
      if(count == this.orderData.items.length){
        console.log("all orders sent");
        resolve (true);
      }
      reject(false)
    })
    
    

    
  }

  private async sendSingleItem(itemId:string,quantity: number) :Promise<any>{
    return new Promise((resolve,reject)=>{
      let str = `${RootProvider.APIURL3}${this.orderAPi}?item_id=${itemId}&user_id=${this.orderData.userId}&payment_id=${this.orderData.paymentId}&shipping_id=${this.orderData.shippingId}&quantity=${quantity}&total_price=${this.orderData.totalPrice}&invoice_id=${this.orderData.invoiceId}&order_datetime=${this.orderData.orderDate.toJSON()}&deliver_address=${this.orderData.deleveryAddress}&deliver_long=${this.orderData.deleveryLong}&deliver_latt=${this.orderData.deleverLatt}`;
      console.log(str);
      this.http.get(str).subscribe(data=>{
        
        resolve(true)
      },err=>{
        console.error(err);
        reject(false);
      }
      )
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

  constructor(){
    this.items = new Array<CartProduct>();
  }
}

