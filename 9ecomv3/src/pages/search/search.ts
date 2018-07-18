import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Category} from '../../providers/category/category';
import { Product} from '../../providers/product/product';
import {ProductPage }from '../product/product';
/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  results: Product[];
  catsArr: Category[];
  mark: string;
  Ready: boolean;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
  ) { 
    this.mark="";
    this.results = new Array<Product>();
    this.catsArr = new Array<Category>();
    this.Ready=false;
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {
    //let db = Database.getInstance();
    //this.results = db.allProduct();
    this.storage.get("appData").then(data=>{
      this.catsArr = <Category[]>data;
     
      for (let i =0 ;i<this.catsArr.length;i++) {
        
        for(let j =0 ;j<this.catsArr[i].children.length;j++){
         
          for(let k = 0;k<this.catsArr[i].children[j].Items.length;k++){
           
            this.results.push(this.catsArr[i].children[j].Items[k]);
          }
        }
      }
      //console.log(this.results);
      this.Ready=true;
    },err=>{
      console.error(err);
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.mark = val;
      this.results = this.results.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      //console.log(this.results);
    } else {
      this.results = [];
    }
  }
  
  decorateTitle(title: string): string {
    let regEx = new RegExp(this.mark, 'ig')
    let str = title.replace(regEx, `<span>${this.mark}</span>`);
    return str;
  }

  toProduct(prod: Product) {
    this.navCtrl.push(ProductPage, {product: prod});
  }
}


