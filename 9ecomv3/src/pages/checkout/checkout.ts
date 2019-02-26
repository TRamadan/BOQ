import { Component, ViewChild } from '@angular/core';
import {Nav, IonicPage, NavController, NavParams, MenuController, Content, AlertController , LoadingController, Alert} from 'ionic-angular';

import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import {Database } from '../../providers/database'
import { Cart } from '../../providers/cart/cart';
import { Order } from '../../providers/order/order';
import { Address ,UsersProvider, User ,state} from '../../providers/users/users';
import { TabsPage } from '../tabs/tabs';
import { CategoryProvider} from '../../providers/category/category'; 
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { ThankPage } from '../thank/thank';

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
      nameAr: "الشحن",
      selected: true
    },
    {
      name: 'Payment',
      nameAr:"الدفع"
    },
    {
      name: 'Confirmation',
      nameAr:"تأكيد"
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
  user : User;
  db: Database;
  cities: Array<state>;
  districts: string[];
  countries: string[];
  zipcodes: string[];
  savedAddresses: Address[];  
  public cityID : string = "";
  ready:boolean=false;
  isTabsSelectable=false;

  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private menu: MenuController,
       private alertCtrl: AlertController,
      public userProv : UsersProvider,
      public order : Order
      ,public loadCtrl : LoadingController
      ,public nav : Nav
      ,public catProv: CategoryProvider, 

      ) { 
        
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.newAddress = new Address();
    this.cities=  new Array();
    this.savedAddresses = new Array();
    this.db = Database.getInstance();
    this.user = this.userProv.getUser();
     
    this.SetData();

    //console.log(this.savedAddresses);
    
    
    //this.cities = this.db.allCities();
    //this.districts = this.db.alldistrict();
    //this.countries = this.db.allCountries();
    //this.zipcodes = this.db.allZipCodes();
    this.selectedTab = this.tabs[0];
    
    this.cart = Cart.getInstance();
    this.shipping(0); 
  }

  async SetData(){
    this.cities = await this.userProv.getState();
    this.savedAddresses = await this.userProv.getAddress(this.user.id);
    console.log(this.savedAddresses);
    this.ready=true;
    
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage')
    if(this.user.addresses.length > 0){
      this.address ='saved';
      console.log(this.address);
    };
    this.tabBarElement.style.display = 'none';
  }

  ionViewDidEnter() {
  
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
  async stepping() {
    if (this.selectedTab !== this.tabs[2]) {
      if (this.selectedTab === this.tabs[0]) {
        let flgFound = false;
        console.log(this.savedAddresses);
        if(this.savedAddresses != undefined && this.savedAddresses.length>0){
        this.savedAddresses.forEach(addr => {
          if (addr.toString() === this.newAddress.toString()) {
            flgFound = true;
          }
        });
      }
        if (!flgFound) {
          if (this.isValid()) {
            console.log(this.newAddress.toString());
            let tempState = this.userProv.getStateByName(this.cities,this.newAddress.city);
            console.log(tempState);
            this.cityID = tempState.id;
            this.newAddress.id =await this.userProv.addAddress(this.newAddress,this.newAddress.zipCode,this.user.email,this.cityID,this.user.id);
            
          this.scrollTab.nextTab();
          } else {
            let alert = this.alertCtrl.create({
              title: 'Address Information 1',
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
      if (this.isValid()) {
        // add order
        let loading = this.loadCtrl.create({
          content: 'Send Order Please Wait'
        });
        loading.present();
        //let output =false;
         console.log(this.newAddress);
        //output =await this.order.addOrder(this.cart.total(),this.newAddress.toString(),this.cart.products);
         let orderId = await this.order.sendOrder(this.user.id,this.newAddress.id,this.cart.total());
         for(let i=0 ; i <this.cart.products.length;i++){
          let output = await this.order.orderItem(orderId,this.cart.products[i].product.id,this.cart.products[i].quantity,this.cart.products[i].product.currentPrice,this.cart.total());
        console.log(output);
        }
        //onsole.log(output);
        if(orderId != "-1" && orderId != "-2"){
          this.db.categories= await this.catProv.getCategoriesNop(); 
          this.cart.clear();
          loading.dismiss();
          //console.log(this.db.categories);
          this.navCtrl.push(ThankPage,{"orderid":orderId})
          
        }else{
           
        setTimeout(()=>{
          if(orderId == "-1" || orderId == "-2"){
            alert('Connection Error Please Try again');
          }
          loading.dismiss()
          
        },10000)
        }
       
        
      }
    }
  }

  chooseAddress(addr : Address) {
    console.log(addr);
    this.newAddress = new Address(addr.houseNum,addr.street,addr.Block,addr.district,addr.city,addr.country,addr.zipCode);
    this.newAddress.id = addr.id;
    console.log(this.newAddress);
    this.address = 'new';
  }

  editAddress(addr: Address) {

  }

  removeAddress(addr: Address) {
    this.userProv.removeAddress(addr);
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
   // console.log(this.promotionCode);
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
  isValid() {
    return (this.newAddress.street !== '' && this.newAddress.houseNum !== undefined)
      && (this.newAddress.city !== '' && this.newAddress.country !== undefined)
      && (this.newAddress.district !== '' && this.newAddress.zipCode !== undefined)
  }

  hasAddress(){
    return this.user.addresses!= undefined && this.user.addresses.length > 0 ? true : false;
  }
}
