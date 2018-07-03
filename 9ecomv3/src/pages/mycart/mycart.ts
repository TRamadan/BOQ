import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../providers/database'
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
}
