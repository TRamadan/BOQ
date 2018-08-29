import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Category} from '../../providers/category/category';
import { Product} from '../../providers/product/product';
import {ProductPage }from '../product/product';
import {Database} from '../../providers/database'; 

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
  allProduct: Array<Product>;
  mark: string;
  Ready: boolean;
  dataBase : Database;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) { 
    this.mark="";
    this.allProduct = new Array<Product>();
    this.results = new Array<Product>();
    this.catsArr = new Array<Category>();
    this.Ready=false;
    this.dataBase =Database.getInstance();

    this.initializeItems();
    console.log(this.dataBase); 
    

  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad SearchPage');
  } 

  initializeItems() {
    //let db = Database.getInstance();
    //this.results = db.allProduct();
    
      this.catsArr = this.dataBase.allCategory();
     
      for (let i =0 ;i<this.catsArr.length;i++) {
        
        for(let j =0 ;j<this.catsArr[i].children.length;j++){
         
          for(let k = 0;k<this.catsArr[i].children[j].Items.length;k++){
            
            this.allProduct.push(this.catsArr[i].children[j].Items[k]);
            
          }
        }
      }
      this.results = this.allProduct;
      //console.log(this.results);
      this.Ready=true;
   
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string  list all items
    this.results = new Array();
    //console.log(this.results.length);
    if (val && val.trim() != '') {
      this.mark = val;
     
      this.results = this.allProduct.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      //console.log(this.results);
    } else {
      this.results = this.allProduct;
    } 
    //console.log(this.allProduct.length);
  }
  doInfinite($event){
    setTimeout(()=>{
     
    })
  }

  allDataExist():boolean{
    console.log(this.results.length == this.allProduct.length ? true : false);
    return this.results.length == this.allProduct.length ? true : false;
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


