import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, AlertController } from 'ionic-angular';

import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { Address, Cart, Order, Database } from '../../providers/database'
/**
 * Generated class for the Checkout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  tabs: IScrollTab[] = [
    {
      name: 'Shipping',
      selected: true
    },
    {
      name: 'Payment',
    },
    {
      name: 'Confirmation',
    },
  ];
  newAddress: Address;
  step: string = 'Continue to payment';
  selectedTab: IScrollTab;
  address: string = 'new';
  applied: boolean = false;
  promotionCode: string;
  paymentType: string = 'cash';
  tabBarElement: any;
  shippingTypes = [true, false, false];
  cart: Cart;
  db: Database;
  cities: string[];
  states: string[];
  countries: string[];
  zipcodes: string[];
  savedAddresses: Address[]; 

  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private alertCtrl: AlertController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.newAddress = new Address();
    this.db = Database.getInstance();
    this.savedAddresses = this.db.allSavedAdddress();
    this.cities = this.db.allCities();
    this.states = this.db.allStates();
    this.countries = this.db.allCountries();
    this.zipcodes = this.db.allZipCodes();
    this.selectedTab = this.tabs[0];
    this.cart = Cart.getInstance();
    this.shipping(0);
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    this.tabBarElement.style.display = 'none';
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'ecom9');
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
    switch (this.selectedTab) {
      case this.tabs[0]:
        this.step = 'Continue to payment';
        break;
      case this.tabs[1]:
        this.step = 'Continue to confirmation';
        break;
      case this.tabs[2]:
        this.step = 'Order Now';
        break;
    }
    this.content.scrollToTop();
  }

  swipeEvent($e) {
    console.log('before', $e.direction);
    switch ($e.direction) {
      case 2: // left
        this.scrollTab.nextTab();
        break;
      case 4: // right
        this.scrollTab.prevTab();
        break;
    }
  }

  shipping(pos: number) {
    this.shippingTypes[pos] = true;
    switch (pos) {
      case 0:
        this.cart.deliveryType = 'Free';
        this.cart.delivery = 0;
        break;
      case 1:
        this.cart.deliveryType = 'Standard';
        this.cart.delivery = 15;
        break;
      case 2:
        this.cart.deliveryType = 'Next-day';
        this.cart.delivery = 25;
        break;
    }
    for (var i = 0; i < this.shippingTypes.length; i++) {
      if (i !== pos) {
        this.shippingTypes[i] = false;
      }
    }
  }
  stepping() {
    if (this.selectedTab !== this.tabs[2]) {
      if (this.selectedTab === this.tabs[0]) {
        let flgFound = false;
        this.savedAddresses.forEach(addr => {
          if (addr === this.newAddress) {
            flgFound = true;
          }
        });
        if (!flgFound) {
          if (this.isValid(this.newAddress)) {
            this.db.addSavedAddress(this.newAddress);
            this.scrollTab.nextTab();
          } else {
            let alert = this.alertCtrl.create({
              title: 'Address Information',
              subTitle: 'Please enter neccessary address information.',
              buttons: [{
                text: 'OK',
                handler: () => {
                  // silent
                }
              }]
            });
            alert.present();
          }
        } else {
          this.scrollTab.nextTab();  
        }
      } else {
        this.scrollTab.nextTab();
      }
    } else {
      if (this.isValid(this.newAddress)) {
        // add order
        let order = new Order();
        order.id = 'SC' + + (new Date()).getTime().toString();
        order.date = new Date();
        order.status = 'Processing';
        this.db.addOrder(order);
        // clear cart and go to Thank Page
        this.cart.clear();
        this.navCtrl.push('ThankPage');
      } else {
        let alert = this.alertCtrl.create({
          title: 'Address Information',
          subTitle: 'Please enter neccessary address information.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
  }

  chooseAddress(addr) {
    this.newAddress = addr;
    this.address = 'new';
  }

  editAddress(addr: Address) {

  }

  removeAddress(addr: Address) {
    this.db.removeSavedAddress(addr);
  }

  information() {
    let alert = this.alertCtrl.create({
      title: 'Promotion Code',
      subTitle: 'You can use code <b>#812006</b> to get <b>10$</b> promotion',
      buttons: ['OK']
    });
    alert.present();
  }

  promotion() {
    console.log(this.promotionCode);
    if (this.promotionCode === '#812006') {
      let alert = this.alertCtrl.create({
        title: 'Promotion',
        subTitle: 'Your promotion successul, total will decrease 10$',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.cart.promotion = 10;
            this.applied = true;
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Promotion Code Error',
        subTitle: 'Your promotion code is wrong, please use #812006',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  isValid(addr: Address) {
    return (addr.firstname !== '' && addr.firstname !== undefined)
      && (addr.lastname !== '' && addr.lastname !== undefined)
      && (addr.address !== '' && addr.address !== undefined)
      && (addr.phone !== '' && addr.phone !== undefined)
      && (addr.city !== '' && addr.city !== undefined)
      && (addr.state !== '' && addr.state !== undefined)
      && (addr.country !== '' && addr.country !== undefined)
      && (addr.zipcode !== '' && addr.zipcode !== undefined)
  }
}
