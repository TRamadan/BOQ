import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { TabsPage } from '../tabs/tabs';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable'; 
import { SigninPage } from "../signin/signin";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public registerForm: FormGroup;
  public gender: string = "";
  public location: string = "";
  constructor(public storage: Storage,
    public userProvider: UsersProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      gender: ['', [Validators.required]],
      location: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  skip() {
    this.navCtrl.setRoot('SigninPage');
  }



  public async onRegester()  {
    if (this.registerForm.valid) {
      //console.log(this.gender);
      //console.log(this.location)
     
      let bool = await this.userProvider.Regester(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name, this.registerForm.value.gender, this.registerForm.value.location, this.registerForm.value.phone)  
      if(bool == true){
        this.navCtrl.setRoot(TabsPage);
      }
      
  }
  /*
  register() {
    this.navCtrl.setRoot('TabsPage');
  }
  */
}
}
