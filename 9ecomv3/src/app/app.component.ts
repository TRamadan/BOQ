import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { RootProvider } from "../providers/root/root";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Database, Cart, Category, subcategory } from '../providers/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  private URLNAME = "http://services.edge-techno.com/boq_v2";
  public catArray : Array<any>;
  public image: string;
  public subcatArray : Array<any>;
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

    public root: RootProvider,
    public http: Http,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {

  
    
    this.catArray = new Array();
    this.subcatArray = new Array();

   this.getcategories();
   

    this.rootPage = 'WelcomePage';
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.database = Database.getInstance();
      this.cart = Cart.getInstance();
      this.menuItems = this.database.parentCategory();
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
    let open: boolean = false;
    this.catArray[i].open = !this.catArray[i].open;

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

  categories(menuItem: Category, child: Category) {
    this.menu.close();
    this.nav.setRoot('TabsPage', { tabIndex: 0, parent: menuItem, detail: child.name });
  }

  /**
   * This function is to load the subcategories for the main categories  
  */
  getsubcats(main_cat_id = 1) { 
     this.http.get(`${this.root.APIURL3}main?main_cat_id=${main_cat_id}`).map(res => res.json()).subscribe(data=>{
       if(data.length == 0)
       {
         console.log("there is no subcategories for this category");
       }
       else{
         let subcat = new Array()
         for(let i = 0; i < data.length; i++)
         {
           subcat[i] = new subcategory(data[i].item_type_name , data[i].item_type_img)
         }
         for(let i = 0; i < this.catArray.length; i++)
         {
           if(this.catArray[i].id == main_cat_id)
           {
             this.catArray[i].children = subcat;
           }
         }
         console.log(this.catArray);
       }
     })
   
  }

  /**
   * This function is to load the main categories to the menu
   */
  
   getcategories() {
    return this.http.get(`${this.root.APIURL3}main`).map(res => res.json()).subscribe(data =>{ 
      if(data.length == 0)
      {
        console.log("No added category here ");
      }
      else 
      {
        if(data.length > 0)
        {
          for(let i = 0; i < data.length; i++)
          {
            this.catArray[i] = new Category(data[i].NewsCategory , data[i].NewsCategoryID);
          }
          this.getsubcats(1);
          //console.log(this.catArray);
        }
      }
    })
  }


}
