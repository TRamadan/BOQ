import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { RootProvider } from "../providers/root/root";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Database } from '../providers/database';
import { Cart } from '../providers/cart/cart';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CategoriesPage } from '../pages/categories/categories';
import { Category ,CategoryProvider } from '../providers/category/category';


export interface PageInterface {

  title: string;
  name: string;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  detail?: string;
}

@Component({
  templateUrl: 'app.html'
})
export class Ecom9App {

  public tempArray: Category[] = [];
  public templastArray = [];

  public catArray: Array<any>;
  public image: string;
  public subcatArray: Array<any>;
  public open: boolean;
  public category: string = "main";
  @ViewChild(Nav) nav: Nav;
  database: Database;
  cart: Cart;
  menuItems: Category[];
  // make HelloIonicPage the root (or first) page
  rootPage: string;
  pages: PageInterface[] = [
    { title: 'Track Orders', name: 'TabsPage', tabName: 'ProfilePage', index: 4, detail: 'my orders' },
    { title: 'Account details', name: 'TabsPage', tabName: 'ProfilePage', index: 4, detail: 'profile' },
    { title: 'Sign out', name: 'SigninPage', tabName: 'SigninPage', index: 2 },
  ];

  constructor(

    public storage: Storage,
    public root: RootProvider,
    public http: Http,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public catProv: CategoryProvider
  ) {



    this.catArray = new Array();
    this.subcatArray = new Array();




    //this.getcategories();


    this.rootPage = 'WelcomePage';
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.database = Database.getInstance();
      this.cart = Cart.getInstance();
      this.menuItems = this.database.parentCategory();
      this.catProv.getCategories().then(data=>{
        this.database.categories = data;
        this.catArray = this.database.categories;
      });
      
     
      //console.log(this.database);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  //////////////////////////////////////

  toggleItems(cat: Category) {
    cat.parentShow = !cat.parentShow;
    this.menuItems.forEach(item => {
      if (item.id !== cat.id) {
        item.parentShow = false;
      }

    })
  }

  /////////////////////////////////////

  toggleItems2(i) {

    this.catArray[i].open = !this.catArray[i].open;
    if (this.catArray[i].open == true) {
      for (let j = 0; j < this.catArray.length; j++) {
        if (i != j) {
          this.catArray[j].open = false;
        }
      }
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if (page.name === 'SigninPage') {
      this.nav.setRoot(page.name);
    } else {
      this.nav.setRoot(page.name, { tabIndex: page.index, tabName: page.tabName, detail: page.detail });
    }
  }


  categories(catid , subcatid) {
    let selectedCategory = this.catArray[catid];
    let selectedSubCat = selectedCategory.children[subcatid];
    this.menu.close();
    this.nav.push(CategoriesPage, {  'tabIndex': 0, 'category': selectedCategory, 'subcat': selectedSubCat });
  }

  /**
   * This function is to load the subcategories for the main categories  
   */
  


}
