import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../providers/category/category';
import { CategoriesPage } from '../categories/categories';

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

  category : Category
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get('Category');
    console.log(this.category);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCateListPage');
  }

  openSubCate(subCate : Category){
    console.log(subCate);
    //console.log(subCate.children[0] instanceof Category );
    if(subCate.children[0] instanceof Category ){
      this.navCtrl.push(SubCateListPage,{'Category': subCate});
    }else{
      
      this.navCtrl.push(CategoriesPage,{'category':subCate});
    }
  }

}
