import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, Content } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { Database } from '../../providers/database';
import { Category } from '../../providers/category/category';
import { Product } from '../../providers/product/product';
import { RootProvider } from "../../providers/root/root";
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Pipe({ name: 'byCategory' })
export class ByCategoryPipe implements PipeTransform {
  transform(products: Product[], category: Category) {
    return products.filter(product => {
      return product.categories.indexOf(category) >= 0;
    });
  }
}

/**
 * Generated class for the Categories page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  tabs: IScrollTab[] = [];
  selectedTab: IScrollTab;
  public itemsArray: Array<any>;
  db: Database;
  products: Product[];
  categories: Category[] = Array<Category>();
  menus: Category;
  show: boolean = true;
  items;
  viewItems;


  selectedTabNum=0;
  ItemsReady: boolean = false;

  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  @ViewChild(Content) content: Content;
  constructor(public http: Http,
    public root: RootProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private modalCtrl: ModalController,
    public storage: Storage
  ) {

    this.itemsArray = new Array();

    //this.items = this.navParams.get('subcategory');


    //console.log(this.items);
    // this.getitems();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    this.show = true;
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
    this.show = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');

    this.db = Database.getInstance();
    this.products = this.db.allProduct();

    var subcat = this.navParams.get('subcat');
    this.menus = this.navParams.get('category');
    //console.log(this.menus);
    if (this.menus) {
      this.categories = this.menus.children;
      this.menus.children.forEach(menu => {
        this.tabs.push({ name: menu.name });
      });

      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name.toLowerCase() === subcat.name.toLowerCase()) {
          this.items = subcat.Items;
          this.viewItems = this.items;
          this.selectedTabNum = i;
          this.scrollTab.go2Tab(i);
        }
      }
    }

   // console.log(this.scrollTab);

  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
    this.content.scrollToTop();
    for(let i = 0 ;i< this.menus.children.length;i++){
        if(this.menus.children[i].name.toLowerCase() === this.selectedTab.name.toLowerCase() ){
          this.items = this.menus.children[i].Items;
          this.viewItems = this.items;
          this.selectedTabNum=i;
        }
    }

  }

  swipeEvent($e) {
   // console.log('before', $e.direction);
    switch ($e.direction) {
      case 2: // left
        this.scrollTab.nextTab();
        break;
      case 4: // right
        this.scrollTab.prevTab();
        break;
    }
  }

  filterModal() {
    let modal = this.modalCtrl.create('FilterModalPage', { 'products': this.items });
    modal.onDidDismiss(data => {
      if (data) {
      //  console.log(data);
        this.viewItems = data.products;
      }
    });
    modal.present();
  }

  toProduct(item) {
    this.navCtrl.push('ProductPage', { product: item });
    //console.log('item passed succesfully to the product page')
   // console.log(item);
  }


  testArr = []; // this array is refered to the array of items needed
  // subArray: Array<any>; 

  /*
  getitems() {
     
     this.http.get(`${this.root.APIURL3}item`).map(res=>res.json()).subscribe(data=>{
       console.log(data)
       if(data.length == null)
       {
         console.log('there is no data here');
       } 
       else{
         for(let i = 0; i < data.length; i++)
         {
           this.testArr[i] = data[i]; 
         }  
         this.ItemsReady = true;
 
         console.log(this.testArr);
       }
     })
   }
   */
}
    /*
    console.log(this.navParams.get('ID'));
    return this.http.get(`${this.root.APIURL3}item`).map(res => res.json()).subscribe(data => {
      if (data.length == null) {
        console.log("there is no data here ... ");
      }
      else {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.testArr[i] = data[i];
            if (this.testArr[i].prod_sub_category == this.idd) {
              console.log(this.testArr[i].prod_sub_category);
              this.subArray[i] = this.testArr[i];
              // console.log(this.subArray[i]);
            }
          }
          console.log(this.itemsArray);
          console.log(this.subArray);
        }
      }
    })
    */