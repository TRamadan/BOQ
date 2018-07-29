import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the QuantitymodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quantitymodal',
  templateUrl: 'quantitymodal.html',
})
export class QuantitymodalPage {
  public qunt : number; 
  constructor(public viewCtrl : ViewController , public navCtrl: NavController, public navParams: NavParams) {
    this.qunt = 0;
    this.qunt = this.navParams.get('Quantity');
    console.log(this.qunt)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantitymodalPage');
  }  

  dismiss(){ 
    //this.qunt = this.navParams.get('Quantity');
    console.log(this.qunt)
    this.viewCtrl.dismiss(this.qunt);
  }




}
