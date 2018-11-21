import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User, UsersProvider } from '../../providers/users/users';
import { TabsPage } from '../tabs/tabs';
import { Order  } from '../../providers/order/order';
import { Database} from '../../providers/database';
/**
 * Generated class for the Signin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public user: User;
  public loginForm: FormGroup;
  public dataBase : Database;

  constructor(public menuctrl: MenuController
    , public storage: Storage
    , public userProvider: UsersProvider
    , public formBuilder: FormBuilder
    , public navCtrl: NavController
    , public navParams: NavParams
    , public orderProv: Order
    , public loadCtrl : LoadingController
  ) {

    this.menuctrl.enable(false);
    this.dataBase = Database.getInstance();
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  /*
  login() {
    this.navCtrl.setRoot('TabsPage');
  }
  */

  register() {
    this.navCtrl.push('SignupPage');
  }
//Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  buildForm() {
    this.loginForm = this.formBuilder.group({

      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    })
  }

  public async onLogin() {
    let loading = this.loadCtrl.create({
      content: 'Logging in ,Please Wait'
    }); 
    
    
    if (this.loginForm.valid) {
      loading.present();
      let salt = await this.userProvider.getSualt(this.loginForm.value.email);
      console.log(salt);
      let bool=false;
      if(salt != -1 && salt != -2){
        bool = await this.userProvider.loginNop(this.loginForm.value.email,this.loginForm.value.password,salt);
      }
      
      if(bool == true){
        loading.dismiss(); 
         this.user = User.getInstance();
         this.storage.set('user',this.user);
         this.navCtrl.setRoot(TabsPage);
         this.user.addresses = await this.userProvider.getAddress(this.user.id);
      }else{
        loading.dismiss();
         alert('Wrong user name or password')
       }
    }else{
      alert('Wrong user name or password')
     }
      //let temp = await this.userProvider.login(this.loginForm.value.email, this.loginForm.value.password)
      //console.log(temp);
     // if (temp ==true) {
     //   loading.dismiss(); 
     // this.user = User.getInstance();
       
       // this.storage.set('user',this.user);
        //this.dataBase.orders = await this.orderProv.getUserOrders(this.user.id);
       // this.navCtrl.setRoot(TabsPage);
     // }else{
     //   loading.dismiss();
    //    alert('Wrong user name or password')
    //  }
   // }else{
   //   alert('Wrong user name or password')
  //  }
  }
}
