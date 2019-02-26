import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController ,LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { TabsPage } from '../tabs/tabs';
import { Storage } from "@ionic/storage";


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
    public menuCtrl: MenuController,
    public loadCtrl : LoadingController
  ) {
    this.menuCtrl.enable(false);
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      fname: ['',[Validators.required]],
      lname: ['',[Validators.required]]
    })
  }

  skip() {
    this.navCtrl.setRoot('SigninPage');
  }



  public async onRegester()  {
    let loading = this.loadCtrl.create({
      content: 'Logging in ,Please Wait'
    });
    if(this.registerForm.value.passwordConfirm != this.registerForm.value.password){
      alert("Password does Not Match")
    }else{
      if (this.registerForm.valid) {
       // loading.present();
        
        //  let add = await this.userProvider.RegesterNop(this.registerForm.value.fname,this.registerForm.value.password,this.registerForm.value.email,this.registerForm.value.phone);
        //  console.log(add);
        //  loading.dismiss();
        //  if(add!= "-1"){
          
        //   console.log(this.userProvider.user);
        //   this.navCtrl.setRoot(TabsPage);
          
        // }else{
        //   alert("this user name is used Please try a new one");
        // }
         
       
        
    }else{
      alert("Invaled fields");
    }

    }

  
}
}
