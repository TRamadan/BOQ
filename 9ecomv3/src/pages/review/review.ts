import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../providers/product/product';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  public product : Product;
  public body:string ;
  public title:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    this.body = "";
    this.title="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }
  addReview(){
    console.log(this.body);
    console.log(this.title);
  }

}
