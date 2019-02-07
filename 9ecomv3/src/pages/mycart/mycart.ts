import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams } from 'ionic-angular';
import {  Database } from '../../providers/database';


import {TabsPage} from '../tabs/tabs';
import { Events } from 'ionic-angular';
import { Cart } from '../../providers/cart/cart';
import { ProductPage } from '../product/product';

/**
 * Generated class for the Mycart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MyCartPage {
  cart: Cart; 
  db : Database;
  constructor(
    public app : App,
    public navCtrl: NavController, public navParams: NavParams , public events : Events) {
    this.cart = Cart.getInstance();   
    //console.log(this.cart);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycartPage');
  }

  placeOrder() {
    this.navCtrl.push('CheckoutPage');
  }

  incQty(item) {
    item.quantity = parseInt(item.quantity) + 1;
  }

  decQty(item) {
    if (parseInt(item.quantity) > 1) {
      item.quantity = parseInt(item.quantity) - 1;
    }
  } 

  shopping()
  { 
    this.app.getRootNav().setRoot(TabsPage,{"tabIndex" : 1});

    //this.events.publish("routeTo" ,TabsPage);
   // console.log("go to homepage to choose msh 3aref a ");
  } 
  
  // this function is to delete item from the cart
  delete_item(p : any)
  {
    //console.log(p);
    this.cart.removeItem(p);
  }

  toSearchPage(){
    this.navCtrl.push('SearchPage');
  }


  toProduct(prod: any) {
    this.navCtrl.push(ProductPage, {'data': prod.product});
  }

 
}
