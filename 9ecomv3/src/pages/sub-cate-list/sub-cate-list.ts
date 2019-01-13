import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category,CategoryProvider } from '../../providers/category/category';
import { CategoriesPage } from '../categories/categories';
import { Product } from '../../providers/product/product';
import { ProductPage } from '../product/product';

/**
 * Generated class for the SubCateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-cate-list',
  templateUrl: 'sub-cate-list.html',
})
export class SubCateListPage {

  category : Category;
  products: Array<Product>;
  mark="";
  results:Array<any>;
  listSelected=-1;
  name="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public CateProv : CategoryProvider) {
    
    this.category = this.navParams.get('data');
    this.name =this.category.name;
    this.products = new Array();
    console.log(this.category);
    this.products = this.CateProv.getCateItem(this.category,this.products);
    console.log(this.products);
    this.results = this.category.children;
    this.changeListed(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCateListPage');
  }

  openSubCate(subCate : Category){
    console.log(subCate);
    //console.log(subCate.children[0] instanceof Category );
    if(subCate.children != undefined && subCate.children[0] instanceof Category ){
      this.navCtrl.push(SubCateListPage,{'data': subCate});
    }else{
      
      this.navCtrl.push(CategoriesPage,{'data':subCate});
    }
  }


  decorateTitle(title: string): string {
    let regEx = new RegExp(this.mark, 'ig')
    let str = title.replace(regEx, `<span>${this.mark}</span>`);
    return str;
  }

  toProduct(prod: Product) {
    this.navCtrl.push(ProductPage, {'data': prod});
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string  list all items
    this.results = new Array();
    //console.log(this.results.length);
    if(this.listSelected == 0){
      this.fillData(val,this.category.children);
  }else{
    this.fillData(val,this.products);

  }
    //console.log(this.allProduct.length);
  }

  fillData(val,data:Array<any>){
    
    if (val && val.trim() != '') {
      this.mark = val;
      
      this.results = data.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      //console.log(this.results);
    } else {
      this.results = data;
    }
  }


  changeListed(choise:number){
    if(this.category.children[0] instanceof Product && choise == 0 ){
    this.listSelected = -1;
    }else if(choise == 1){
      this.listSelected = choise;
      this.results = this.products;
    }else{
      this.listSelected = choise;
      this.results = this.category.children;
    }

  }


}
