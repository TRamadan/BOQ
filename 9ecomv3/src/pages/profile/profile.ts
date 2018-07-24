import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';


import { Database } from '../../providers/database';
import { Cart,CartProduct} from '../../providers/cart/cart';
import { User , Address ,UsersProvider} from '../../providers/users/users';
import { Product } from '../../providers/product/product';
import { Order } from '../../providers/order/order';
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
  u : any;
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
  wishProducts: Product[]; 
  userarray : any =  [];
  orders: Order[];
  cart: Cart; 
  user : User;
  
  // this a flag to show the user is exists or not to show his data in the profile
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private menu: MenuController
    , public userProv : UsersProvider
  ) {
    this.selectedTab = this.tabs[0];
    this.db = Database.getInstance();
    this.cart = Cart.getInstance();
    this.user = this.userProv.getUser();
    this.savedAddresses = this.user.addresses;
    this.wishProducts = this.db.allWishList(); 
    this.orders = this.db.allOrders();  
    console.log(this.user);
    
  }

  /*
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'ecom9');
    var detail = this.navParams.get('user');
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
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
  }

  swipeEvent($e) {
    //console.log('before', $e.direction);
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
    this.user.removeSavedAddress(addr);
  }

  add2Cart(wish: Product) {
    let cp: CartProduct;
    cp = {
      product: wish,
      quantity: 1,
     // color: wish.color,
     // size: wish.size,
    };
    let flgFound = false;
    this.cart.products.forEach(Wish => {
      if (Wish.product.id === cp.product.id) {
        flgFound = true;
        Wish.quantity = parseInt(Wish.quantity.toString()) + parseInt(cp.quantity.toString());
      }
    })
    if (!flgFound) {
      this.cart.products.push(cp);  
    } 
    
  }

  removeWish(wish: Product) {
    this.db.removeWish(wish);
  }
}
