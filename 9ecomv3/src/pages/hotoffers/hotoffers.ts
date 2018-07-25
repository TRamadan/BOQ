import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Category} from '../../providers/category/category';
import { Storage } from "@ionic/storage";
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
   
  public get_offers=[]; 

  public ReadyOffers : boolean = false;
  
  public Activenow : number = -1; 

  public filtered_Array : Array<any>; 

  menuItems: Category[];
  constructor(public storage : Storage ,  public navCtrl: NavController, public navParams: NavParams) {
    let db = Database.getInstance();
    this.menuItems = db.parentCategory();

    this.storage.get('offersData').then(data=>{
      this.get_offers = data; 
      console.log(data); 
      this.ReadyOffers = true; 
      this.filter();
    },err=>{
      console.log(err);
    }) 
    
    this.filtered_Array = new Array();
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

  filter(offer_id : any = "", Activenumber : any = -1) 
  {  
    this.Activenow = Activenumber; 
    this.filtered_Array = new Array();
    if(offer_id == "")
    {
      this.filtered_Array = this.get_offers;  
      
      //console.log(this.filtered_Array);
    } 
    else{
      let ctr =0; 
      //console.log(offer_id);
      for(let i = 0; i<this.get_offers.length; i++)
      {
        if(this.get_offers[i].offer_id == offer_id)
        {
          this.filtered_Array[ctr] = this.get_offers[i]; 
          ctr++;
        }
      }
    }
  }
}
