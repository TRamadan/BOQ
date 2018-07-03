import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../providers/database';
/**
 * Generated class for the Tabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root: string = 'HomePage';
  tab2Root: string = 'HotoffersPage';
  tab3Root: string = 'MyCartPage';
  tab4Root: string = 'SearchPage';
  tab5Root: string = 'ProfilePage';

  detail: NavParams;
  selectedIndex: number;
  cart: Cart;
  constructor(public navCtrl: NavController, private params: NavParams) {
    this.selectedIndex = params.data.tabIndex || 0;
    this.detail = params;
    this.cart = Cart.getInstance();
  }

}
