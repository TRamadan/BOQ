import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderData, OrderItem } from '../../providers/order/order';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  public order:OrderData;
  public orderItems: Array<OrderItem>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order =navParams.get('order');
    this.orderItems =this.order.Items;
    console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

}
