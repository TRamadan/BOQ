import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Category , CategoryProvider, Vendor} from '../../providers/category/category';
import { Product} from '../../providers/product/product';
import {ProductPage }from '../product/product';
import {Database} from '../../providers/database'; 
import { Cart } from '../../providers/cart/cart';

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
  resultsProd: any[];
  resultsVend: any[];
  catsArr: Category[];
  allProduct: Array<Product>;
  allVendors:Array<Vendor>;
  mark: string;
  Ready: boolean;
  dataBase : Database;
  searchSegment:string="";
  cart : Cart;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public catProv : CategoryProvider

  ) { 
    this.mark="";
    this.allProduct = new Array<Product>();
    this.resultsProd = new Array<Product>();
    this.catsArr = new Array<Category>();
    this.allVendors= new Array<Vendor>();
    this.Ready=false;
    this.cart = Cart.getInstance();
    this.dataBase =Database.getInstance();

    this.initializeItems();
    this.allVendors=this.dataBase.vendors;
    this.searchSegment="Products";
    console.log(this.dataBase); 
    

  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad SearchPage');
  } 

  initializeItems() {
    //let db = Database.getInstance();
    //this.resultsProd = db.allProduct();
    
      this.catsArr = this.dataBase.categories;
      console.log(this.catsArr);
      for(let i = 0 ; i < this.catsArr.length;i++){
        let tempArr = new Array<Product>();
        tempArr =this.catProv.getCateItem(this.catsArr[i],tempArr);
        console.log(tempArr);
        this.allProduct.push(...tempArr);
      }
      console.log(this.allProduct);
      //this.resultsProd = this.allProduct;
      //console.log(this.resultsProd);
      this.Ready=true;
   
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string  list all items
    this.resultsProd = new Array();
    //console.log(this.resultsProd.length);
   
    if (val && val.trim() != '') {
      this.mark = val;
     
      this.resultsProd = this.allProduct.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.resultsVend= this.allVendors.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      //console.log(this.resultsProd);
    } else {
      this.resultsProd = new Array();
      this.resultsVend = new Array();
    } 
    //console.log(this.allProduct.length);
  }
  doInfinite($event){
    setTimeout(()=>{
     
    })
  }

  allDataExist():boolean{
    console.log(this.resultsProd.length == this.allProduct.length ? true : false);
    return this.resultsProd.length == this.allProduct.length ? true : false;
  }
  
  decorateTitle(title: string): string {
    let regEx = new RegExp(this.mark, 'ig')
    let str = title.replace(regEx, `<span>${this.mark}</span>`);
    return str;
  }

  toProduct(prod: any) {
    this.navCtrl.push(ProductPage, {data: prod});
  }
  toVendor(vendor: any){
    console.log(vendor);
  }
  add2Cart(product:any) { 
    let flgFound = false;
    this.cart.products.forEach(specific_item => {
      //console.log(specific_item)

      if (specific_item.product != undefined && specific_item.product.id === product.id) {
        flgFound = true;
        specific_item.quantity = parseInt(specific_item.quantity.toString()) + 1;
      }
      
    })
    
    if (!flgFound) {
      this.cart.products.push({ product: product, quantity: 1 });
    }
  
  }
}



