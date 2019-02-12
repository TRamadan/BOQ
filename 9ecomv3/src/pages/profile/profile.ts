import { Component, ViewChild } from '@angular/core';
import {App, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { Storage} from '@ionic/storage';
import { Database } from '../../providers/database';
import { Cart,CartProduct} from '../../providers/cart/cart';
import { User , Address ,UsersProvider} from '../../providers/users/users';
import { Product } from '../../providers/product/product';
import { OrderData, Order } from '../../providers/order/order';
import { TranslatorProvider } from '../../providers/translator/translator';
import { OrderDetailsPage } from '../order-details/order-details';
import { ProductPage } from '../product/product';
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
  tabNum:any;
  tabs: IScrollTab[] = [
    {
      name: 'Profile',
      nameAr: 'الملف الشخصي',
      selected: true
    },
    {
      name: 'My orders',
      nameAr: 'طلباتي'
    },
    {
      name: 'Wishlist',
      nameAr: 'المفضل'
    },
    {
      name: 'Saved Address',
      nameAr: 'عنواني'
    },
  ];
  isTabsSelectable=true;

  quantity : number = 1;
  selectedTab: IScrollTab;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  db: Database;
  savedAddresses: Address[];
  wishProducts: Product[]; 
  userarray : any =  [];
  orders: OrderData[];
  cart: Cart; 
  user : User;
  ordersReady=false;
  
  // this a flag to show the user is exists or not to show his data in the profile
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private menu: MenuController
    , public userProv : UsersProvider
    , public storage: Storage
    , public app: App
    , public transProv: TranslatorProvider
    , public orderProv: Order
  ) {
    this.selectedTab = this.tabs[0];
    this.db = Database.getInstance();
    this.cart = Cart.getInstance();
    this.user = this.userProv.getUser();
    this.savedAddresses = this.user.addresses;
    this.wishProducts = this.db.allWishList(); 
    
    this.orders = this.db.allOrders();  
    console.log(this.user);
    console.log(this.wishProducts);
    this.tabNum='0';
    this.orderProv.getUserOrders(this.user.id).then(data=>{
      this.orders=data;
      console.log(this.orders);
      this.ordersReady=true;
    });
    
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
    this.userProv.removeAddress(addr);
  }

  add2Cart(product:any) { 
    let flgFound = false;
    this.cart.products.forEach(specific_item => {
      //console.log(specific_item)

      if (specific_item.product != undefined && specific_item.product.id === product.id) {
        flgFound = true;
        specific_item.quantity = parseInt(specific_item.quantity.toString()) + 1;
      }
      
    })
    
    if (!flgFound) {
      this.cart.products.push({ product: product, quantity: 1 });
    }
  }

  removeWish(wish: Product) {
    this.db.removeWish(wish);
  }
  openOrder(order:OrderData){
    this.navCtrl.push(OrderDetailsPage,{'order': order});
  }
  signOut(){
      this.storage.remove('user');
      if(this.app.getActiveNavs()!= undefined &&this.app.getActiveNavs().length >0)
      {
        const root = this.app.getRootNavs()[0];
        root.setRoot('SigninPage')
        root.popToRoot();
       
      }
     
  }
  toSearchPage(){
    this.navCtrl.push('SearchPage');
  }
  toProduct(prod: Product) {
    this.navCtrl.push(ProductPage, {'data': prod});
  }

  changelang(){
    this.transProv.switchLang();
  }

  
}
