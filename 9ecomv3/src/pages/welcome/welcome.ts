import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

import { User } from '../../providers/users/users';
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

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public menuCtrl : MenuController
    , public storage: Storage
  ) {
    this.menuCtrl.enable(false);
    this.storage.get('user').then(data=>{
      if(data != null){
        let userData = <User> data;
        User.getInstance(userData.id,userData.name,userData.gender,userData.password,userData.email,userData.phone,userData.fName,userData.lName,userData.addresses);
        console.log(User.getInstance())
      }

      this.ready = true;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  signin() {
    console.log(User.getInstance);
    if(User.isCreating){
      
      this.navCtrl.setRoot('TabsPage')
    }else{
      this.navCtrl.setRoot('SigninPage');
    }
    
  }
}
