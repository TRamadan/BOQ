import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  signin() {
    this.navCtrl.setRoot('SigninPage');
  }
}
