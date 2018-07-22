import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User, UsersProvider } from '../../providers/users/users';
import { TabsPage } from '../tabs/tabs';


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

  constructor(public menuctrl: MenuController
    , public storage: Storage
    , public userProvider: UsersProvider
    , public formBuilder: FormBuilder
    , public navCtrl: NavController
    , public navParams: NavParams
  ) {

    this.menuctrl.enable(false);

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

  buildForm() {
    this.loginForm = this.formBuilder.group({

      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    })
  }

  public async onLogin() {
    if (this.loginForm.valid) {
      let temp = await this.userProvider.login(this.loginForm.value.email, this.loginForm.value.password);
      console.log(temp);
      if (temp ==true) {
        this.navCtrl.setRoot(TabsPage);
      }
    }
  }
}
