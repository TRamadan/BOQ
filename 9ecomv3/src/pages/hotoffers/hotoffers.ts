import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Category} from '../../providers/category/category';
import { Storage } from "@ionic/storage";
import { Product } from '../../providers/product/product';
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
   
  

  public ReadyOffers : boolean = false;
  
  public allOffers: Array<string>;

  public Activenow : number = -1; 

  public filtered_Array : Array<any>; 

  public cats : Array<Category>;

  public allOfferd : Array<Product>;

  menuItems: Category[];
  constructor(public storage : Storage ,  public navCtrl: NavController, public navParams: NavParams) {
    // let db = Database.getInstance();
    // this.menuItems = db.parentCategory();
    // this.cats= db.allCategory();
    // this.allOfferd = new Array();
    //  this.filtered_Array = new Array();
    //  this.allOffers = new Array();
    //  this.getOferedItems()
    // //iterate over the category hirerachy ..
    // // passing through the categories , subcategories , items and product
   
    // this.filter();
    // this.getAllOffers(this.allOfferd);
    // this.ReadyOffers = true;
   
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

  filter(offer_name : any = "", Activenumber : any = -1) 
  {  
    this.Activenow = Activenumber; 
    this.filtered_Array = new Array();
    if(offer_name == "")
    {
      this.filtered_Array = this.allOfferd;  
      
      //console.log(this.filtered_Array);
    } 
    else{
      
      //console.log(offer_name);
      this.allOfferd.forEach(item=>{
        if(item.offer_name == offer_name){
          this.filtered_Array.push(item);
        }
      })
    }
  }
  getOferedItems(){
    this.cats.forEach(category => {
      //console.log(category);
      category.children.forEach(subCat =>{
        //console.log(subCat);
        //let sub = <subcategory> subCat;
        subCat.Items.forEach(item =>{
          if(item.offer_id != 0){
            this.allOfferd.push(item);
          }
        })
        })
      })
      console.log(this.allOfferd);
    
  }

  getAllOffers(items : Array<Product>){
    items.forEach(item=>{
      if(this.allOffers.length ==0){
        this.allOffers.push(item.offer_name);
      }else{
        let flag =true;
        this.allOffers.forEach(offer=>{
          if(offer == item.offer_name){
            flag= false;
          }

        })
        if(flag){
          this.allOffers.push(item.offer_name);
        }
      }
    })
    
  } 

  toProduct(item) {
    console.log(item);
    this.navCtrl.push('ProductPage', { 'product': item });
    //console.log('item passed succesfully to the product page')
   // console.log(item);
  }


}
