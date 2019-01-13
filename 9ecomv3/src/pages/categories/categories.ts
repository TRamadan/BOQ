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
import { DomSanitizer, SafeUrl } from '../../../node_modules/@angular/platform-browser';
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
  name: string ="";
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
    , private sanitizer: DomSanitizer

  ) {

    this.items = new Array();
    this.viewItems = new Array();
    this.db = Database.getInstance();
    this.products = this.db.allProduct();



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
   
    this.menus = this.navParams.get('data');
    this.name = this.menus.name;
    console.log(this.menus);
    
    if (this.menus) {
      this.items = this.menus.children;
      this.ItemsReady=true;
      console.log(this.viewItems);
    }
    
  }

  

  
  getImgContent(imageData: string):SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(imageData);
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
    let modal = this.modalCtrl.create('FilterModalPage', { 'data': this.items });
    modal.onDidDismiss(data => {
      if (data) {
      //  console.log(data);
        this.viewItems = data.products;
      }
    });
    modal.present();
  }

  toProduct(item) {
    console.log(item);
    this.navCtrl.push('ProductPage', { 'product': item });
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