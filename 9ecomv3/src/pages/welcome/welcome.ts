import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';
import { Storage} from '@ionic/storage';

import { Order} from '../../providers/order/order';
import { Database }from '../../providers/database';
import { User } from '../../providers/users/users';
import {  CategoryProvider } from '../../providers/category/category';
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
      image: 'assets/img/welcome/welcome.png',
    },
    {
      image: 'assets/img/welcome/welcome1.png',
    },
    {
      image: 'assets/img/welcome/welcome2.png',
    },
    {
      image: 'assets/img/welcome/welcome3.png',
    },
    {
      image: 'assets/img/welcome/welcome4.png',
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
  ) {
    this.menuCtrl.enable(false);
    this.db = Database.getInstance();

    this.catProv.getCategories().then(data=>{
      this.db.categories = data;
      this.loadProgress=50;
      this.ready = true;

      this.storage.get('user').then(data=>{
        console.log(data);

        if(data != null){
          //console.log("test");
          this.userData = <User> data;
          User.getInstance(this.userData.id,this.userData.name,this.userData.gender,this.userData.password,this.userData.email,this.userData.phone,this.userData.fName,this.userData.lName,this.userData.addresses);
          //console.log(User.getInstance())
          this.loadProgress= this.loadProgress+ 30;
          
            this.db = Database.getInstance();
            this.order.getUserOrders(this.userData.id).then(data=>{
              this.loadProgress= this.loadProgress+ 20;
              this.db.orders = data;
              this.navCtrl.setRoot('TabsPage');
            });
            
          
        }else{
          this.loadProgress=100;
          this.navCtrl.setRoot('SigninPage');
        }
       
  
       
      })

    });





    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  async signin() {
    console.log(User.isCreating);
    
    
  }
}
