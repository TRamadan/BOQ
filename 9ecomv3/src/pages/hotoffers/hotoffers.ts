import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Category} from '../../providers/categories/categories';
/**
 * Generated class for the HotOffer page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hotoffers',
  templateUrl: 'hotoffers.html',
})
export class HotoffersPage {
  menuItems: Category[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let db = Database.getInstance();
    this.menuItems = db.parentCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotoffersPage');
  } 

  
  categories(id: string) {
    this.menuItems.forEach(item => {
      if(item.id === id) {
        this.navCtrl.push('CategoriesPage', {menus: item, select: item.children[0].name.toLowerCase()});
      }
    })
  }
}
