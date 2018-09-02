import { Component } from '@angular/core';
<<<<<<< .merge_file_a04896
import { IonicPage, NavController, NavParams , MenuController } from 'ionic-angular';
import { Cart } from '../../providers/cart/cart';
=======
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { Cart } from '../../providers/cart/cart';
import { Keyboard } from "@ionic-native/keyboard";

>>>>>>> .merge_file_a08080

/**
 * Generated class for the Tabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
<<<<<<< .merge_file_a04896
  templateUrl: 'tabs.html'
=======
  templateUrl: 'tabs.html', 
  providers: [Keyboard]
>>>>>>> .merge_file_a08080
})
export class TabsPage {
  
  tab1Root: string = 'HomePage';
  tab2Root: string = 'HotoffersPage';
  tab3Root: string = 'MyCartPage';
  tab4Root: string = 'SearchPage';
<<<<<<< .merge_file_a04896
  tab5Root: string = 'ProfilePage';
=======
  tab5Root: string = 'ProfilePage'; 

  public valueforngif : boolean = true;
>>>>>>> .merge_file_a08080

  detail: NavParams;
  selectedIndex: number;
  cart: Cart;
<<<<<<< .merge_file_a04896
  constructor(public navCtrl: NavController, private params: NavParams,public menuCtrl : MenuController) {
    this.menuCtrl.enable(true);
    this.selectedIndex = params.get('tabIndex') || 0;
    this.detail = params;
    this.cart = Cart.getInstance();
   
  }
=======
  constructor(public kb : Keyboard ,   public navCtrl: NavController, private params: NavParams,public menuCtrl : MenuController) {
    this.menuCtrl.enable(true);
    this.selectedIndex = params.get('tabIndex') || 0;
    this.detail = params;
    this.cart = Cart.getInstance();  

    this.ionViewDidEnter();
    
   
  }
 
  ionViewDidEnter(){
    this.kb.onKeyboardShow().subscribe(()=>{
      this.valueforngif=false; 
      console.log("heyeee")
    })
    this.kb.onKeyboardHide().subscribe(()=>{
      this.valueforngif=true;
      console.log("hooooy");
    
    })
} 
>>>>>>> .merge_file_a08080

  public navTo(tabIndex: any){
    this.selectedIndex=tabIndex;
  }

}
