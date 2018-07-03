import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { WishProduct, CartProduct, Order, Address, Cart, Database } from '../../providers/database'
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  tabs: IScrollTab[] = [
    {
      name: 'Profile',
      selected: true
    },
    {
      name: 'My orders',
    },
    {
      name: 'Wishlist',
    },
    {
      name: 'Saved Address',
    },
  ];
  selectedTab: IScrollTab;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  db: Database;
  savedAddresses: Address[];
  wishProducts: WishProduct[];
  orders: Order[];
  cart: Cart;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
    this.selectedTab = this.tabs[0];
    this.db = Database.getInstance();
    this.cart = Cart.getInstance();
    this.savedAddresses = this.db.allSavedAdddress();
    this.wishProducts = this.db.allWishList();
    this.orders = this.db.allOrders();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'ecom9');
    var detail = this.navParams.get('detail');
    console.log(detail);
    if (detail) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name.toLowerCase() === detail.toLowerCase()) {
          this.scrollTab.go2Tab(i);
          this.navParams.data.detail = undefined;
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
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

  editAddress(addr: Address) {

  }

  removeAddress(addr: Address) {
    this.db.removeSavedAddress(addr);
  }

  add2Cart(wish: WishProduct) {
    let cp: CartProduct;
    cp = {
      product: wish.product,
      quantity: 1,
      color: wish.color,
      size: wish.size,
    };

    let flgFound = false;
    this.cart.products.forEach(item => {
      if (item.product.id === cp.product.id) {
        flgFound = true;
        item.quantity = parseInt(item.quantity.toString()) + parseInt(cp.quantity.toString());
      }
    })
    if (!flgFound) {
      this.cart.products.push(cp); 
    }
  }

  removeWish(wish: WishProduct) {
    this.db.removeWish(wish);
  }
}
