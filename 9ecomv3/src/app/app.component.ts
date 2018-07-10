import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { RootProvider } from "../providers/root/root";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Database, Cart, Category, subcategory, Product } from '../providers/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CategoriesPage } from '../pages/categories/categories';

var require :any;
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
    

    this.getitems();
    
    //this.getcategories();
  

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

  categories(Subitems) {
    console.log("herfkhfhf")
    console.log(Subitems);
    this.menu.close();
    this.nav.push(CategoriesPage , { subcategory : Subitems });
  }

  /**
   * This function is to load the subcategories for the main categories  
  */
  getsubcats(items) {  
     this.http.get(`${this.root.APIURL3}itemtype2`).map(res => res.json()).subscribe(data=>{
       if(data.length == null)
       {
         console.log("there is no subcategories");
       }
       else{
         let subcat = new Array()
         for(let i = 0; i < data.length; i++)
         {
          let Subitems = new Array();
           for(let j =0;j<items.length ; j++){
            
             if(data[i].id == items[j].product_subcat){
               Subitems.push(items[j])
              
              
             }
             subcat[i] = new subcategory(data[i].item_type_name ,data[i].main_cat_id, data[i].id ,data[i].item_type_img,Subitems)
           }  
           

         }
         console.log(subcat);
         this.getcategories(subcat);
         
       }
     })
   
  }

   /**
   * This function is to load the main categories to the menu
   */
   getcategories(subcat) {
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
            let tempcats = new Array(); 
           for(let j =0 ; j < subcat.length ; j++){
            
             if(data[i].NewsCategoryID == subcat[j].mainCat){
              tempcats.push(subcat[j]);

              //console.log(tempcats);
             }
             this.catArray[i] = new Category(data[i].NewsCategory , data[i].NewsCategoryID,tempcats);
           }

           
          } 
          
          console.log(this.catArray);
        }
      }
    })
  } 
  
getitems() {
  this.http.get(`${this.root.APIURL3}item`).map(res=>res.json()).subscribe(data=>{
    
    if(data.length == 0)
    {
      return null
    } 
    else{
      let items : Product[] = new Array();
      for(let i = 0 ; i < data.length ; i++){
        items[i] = new Product(data[i].prod_name,data[i].point_id,data[i].prod_sub_category,data[i].prod_image,data[i].prod_image2,data[i].quantity,data[i].measure_unit,data[i].prod_desc,data[i].point_id,data[i].price);
      }
      console.log(data);
      console.log(items);
      this.getsubcats(items); 
    }
  })
}



}
