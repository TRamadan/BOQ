import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Product } from '../../providers/product/product';

/**
 * Generated class for the InquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquiry',
  templateUrl: 'inquiry.html',
})
export class InquiryPage {
  
  @ViewChild('myInput') myInput: ElementRef;  
  public product : Product;
  
  public user_inquiry_info : Array<{inquiry_type : string , message : string , company : string , productname : string , username : string , email : string , company_name}>;
  constructor(public view : ViewController , public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    console.log(this.product); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquiryPage');
  } 

  close() 
  {
    this.view.dismiss();
    console.log("modal is closed succesfully");
  } 

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
} 

send() { 

  console.log("akfjkajfkaf");
}




}
