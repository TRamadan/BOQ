import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { Product, Cart, Database } from '../../providers/database'

/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  cb: boolean[] = [false, true, false, false, false]
  size: boolean[] = [false, true, false, false, false]
  @ViewChild('qtySelect') qtySelect: Select;

  currentQty: string = 'Qty: 1';
  quantity: number = 1;
  currentColor: string;
  currentSize: string;
  hideIt: boolean = true;
  tabBarElement: any;
  product: Product;
  cart: Cart;
  db: Database;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.product = this.navParams.get('product');
    this.db = Database.getInstance();
    this.cart = Cart.getInstance();
    if (this.product.colors.length > 0) {
      this.clearColor(1);
    }
    if (this.product.sizes.length > 0) {
      this.clearSize(1);
    }
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.tabBarElement.style.display = 'none';
  }

  clearColor(pos) {
    for (var i = 0; i < this.cb.length; i++) {
      if (i !== pos) {
        this.cb[i] = false;
      }
    }
    setTimeout(() => {
      this.cb[pos] = true;
      this.currentColor = this.product.colors[pos];
    }, 200);
  }

  clearSize(pos) {
    for (var i = 0; i < this.size.length; i++) {
      if (i !== pos) {
        this.size[i] = false;
      }
    }
    this.size[pos] = true;
    this.currentSize = this.product.sizes[pos];
  }

  selectQty() {
    this.qtySelect.open();
  }

  loveIt() {
    this.product.love = !this.product.love;

    setTimeout(() => {
      if(this.product.love) {
        this.db.addWish({ product: this.product, color: this.currentColor, size: this.currentSize })
      } else {
        this.db.removeProductWish(this.product);
      }
    }, 150);
  }

  quantityChange() {
    console.log(this.quantity);
    this.currentQty = 'Qty: ' + this.quantity.toString();
  }

  goCart() {
    this.navCtrl.pop();
    setTimeout(() => {
      this.navCtrl.parent.select(2);
    }, 100);
  }

  add2Cart() {
    let flgFound = false;
    this.cart.products.forEach(item => {
      if (item.product.id === this.product.id) {
        flgFound = true;
        item.quantity = parseInt(item.quantity.toString()) + parseInt(this.quantity.toString());
      }
    })
    if (!flgFound) {
      this.cart.products.push({ product: this.product, quantity: this.quantity, color: this.currentColor, size: this.currentSize });
    }
    setTimeout(() => {
      this.navCtrl.pop();
    }, 300);
  }
}
