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

  public cats : Array<Category>;

  menuItems: Category[];
  constructor(public storage : Storage ,  public navCtrl: NavController, public navParams: NavParams) {
    let db = Database.getInstance();
    this.menuItems = db.parentCategory();
    this.cats= db.allCategory();
    console.log(this.cats); 
     this.filtered_Array = new Array();

    //iterate over the category hirerachy ..
    // passing through the categories , subcategories , items and product
  
    for(let i = 0; i < this.cats.length; i++)
    {
      for(let j = 0;  j < this.cats[i].children.length; i++)
      {
        for(let k = 0;  k < this.cats[i].children[j].Items.length; k++) 
        {
          if(this.get_offers.length == 0)
          {
            this.get_offers.push(this.cats[i].children[j].Items[k].offer_name);
          } 
          else{
            let flag = false;
            let flag2 = false;
            for(let I = 0; I < this.get_offers.length; I++)   
            {
                 if(this.cats[i].children[j].Items[k].offer_name =="no offer" )
                 {
                   flag =true;
                   flag2 = true;
                 }else{
                  if(this.get_offers[I] == this.cats[i].children[j].Items[k].offer_name ){
                    flag = true;
                  }
                  
                 }
                  
                 
                 
            }
            if(!flag){
              this.get_offers.push(this.cats[i].children[j].Items[k].offer_name);
              
            }
            if(!flag2){
              this.filtered_Array.push(this.cats[i].children[j].Items[k]);
            }
          }
        }
      }
    } 
    console.log(this.get_offers);
    this.ReadyOffers = true;
   
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
      console.log(offer_id);
      for(let i = 0; i<this.cats.length; i++)
      {
        for(let j =0 ; j <this.cats[i].children.length ; j++){
          for(let k=0 ; k<this.cats[i].children[j].Items.length ; k++){
            if(offer_id ==  this.cats[i].children[j].Items[k].offer_name)
            {
              this.filtered_Array[ctr] = this.cats[i].children[j].Items[k]; 
              ctr++;
            }
          }
        }
       
      }
    }
  } 

}
