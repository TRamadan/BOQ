import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { Category } from '../../providers/category/category';

/**
 * Generated class for the CateListModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cate-list-modal',
  templateUrl: 'cate-list-modal.html',
})
export class CateListModalPage {

  public Cates : Array<Category>;
  public viewCates: Array<Category>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.Cates= new Array<Category>();
    this.Cates= this.navParams.get('cates');
    this.viewCates = this.Cates;
    console.log(this.viewCates)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CateListModalPage');
  }

  choose(cate: Category){
    this.viewCtrl.dismiss(cate);
  }

  search(ev:any){
   let val =  ev.target.value;
   this.viewCates = new Array();
   this.viewCates =this.Cates.filter((item) => {
    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  });

  }


}
