import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the Thank page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-thank',
  templateUrl: 'thank.html',
})
export class ThankPage {
  tabBarElement: any;
  orderId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.orderId=this.navParams.get('orderid');
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankPage');
    setTimeout(() => {
      this.tabBarElement.style.display = 'none';
    }, 150)
  }

  shopping() {
    this.navCtrl.setRoot(TabsPage,{"tabIndex":0})
    
  }
}
