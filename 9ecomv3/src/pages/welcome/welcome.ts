import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';
import { Storage} from '@ionic/storage';

import { Order} from '../../providers/order/order';
import { Database }from '../../providers/database';
import { User,UsersProvider } from '../../providers/users/users';
import {  CategoryProvider, Category } from '../../providers/category/category';
import { Product } from '../../providers/product/product';
interface shopSlider {
  image: string;
}
/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  shopSliders: shopSlider[] = [
    {
      image: 'assets/img/welcome/welcome1.jpg',
    },
    {
      image: 'assets/img/welcome/welcome2.jpg',
    },
    {
      image: 'assets/img/welcome/welcome3.jpg',
    },
    {
      image: 'assets/img/welcome/welcome4.jpg',
    },
    {
      image: 'assets/img/welcome/welcome5.jpg',
    },
  ];
  public ready = false;
  public db : Database;
  public userData;
  public loadProgress = 0;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public menuCtrl : MenuController
    , public storage: Storage
    , public order: Order
    , public catProv : CategoryProvider
    , public userProv: UsersProvider
  ) {
    this.menuCtrl.enable(false);
    this.db = Database.getInstance();
    this.loadProgress=30;
    this.catProv.getCategoriesNop().then(data=>{
      this.db.categories = data;
      console.log(data);
      this.loadProgress=50;
      console.log(this.loadProgress);
      this.ready = true;

      this.storage.get('user').then(data=>{
        console.log(data);

        if(data != null){
          //console.log("test");
          this.userData = <User> data;
          User.getInstance(this.userData.id,this.userData.name,this.userData.password,this.userData.email,this.userData.gender,this.userData.phone,this.userData.fName,this.userData.lName,this.userData.addresses);
          //console.log(User.getInstance())
          this.loadProgress= this.loadProgress+ 30;
          console.log(this.loadProgress);
          
            this.db = Database.getInstance();
            this.userProv.getAddress(this.userData.id).then(data=>{
              this.userData.Addresses = data;
              console.log(this.db.Addresses);
              this.navCtrl.setRoot('TabsPage');

          })
           /*
            this.order.getUserOrders(this.userData.id).then(data=>{
              this.loadProgress= this.loadProgress+ 20;
              console.log(this.loadProgress);
              this.db.orders = data;
             
            });
            */
            
            
          
        }else{
          console.log(this.loadProgress);
          this.loadProgress=100;
         this.navCtrl.setRoot('SigninPage');
        }
       
  
       
      })

    });





    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  
}
