import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart, Database, Product } from '../../providers/database'
import { CategoriesPage } from '../categories/categories';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cart = Cart.getInstance();   
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
    // logic of this function will be added here
    console.log("go to homepage to choose msh 3aref a ");
  } 
  
  // this function is to delete item from the cart
  delete_item(p : Product)
  {
    this.db.delet_specific_item(p);
  }
 
}
