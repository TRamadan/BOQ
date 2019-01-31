import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';


/*
  Generated class for the TranslatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslatorProvider {
  translateHttpLoader;
  public langs : Array<string>;
  public side: string;

  constructor(public http: HttpClient,private tarnslateService : TranslateService , private platform : Platform) {
    this.translateHttpLoader = new TranslateHttpLoader(http, 'assets/i18n/', '.json');
    this.langs = new Array();
    this.langs.push('en');
    this.langs.push('ar');
    this.tarnslateService.setDefaultLang('en');
    this.switchLang();
  }
public switchLang(){
  if(this.getLang() == 'en'){
  this.tarnslateService.use('ar');
  //this.changeDir('ar');
  }else{
  this.tarnslateService.use('en');
  //this.changeDir('en');
  }
  
}
public changeDir(lang) {
  if (lang === 'ar') {
    this.platform.setDir('rtl', true);
    this.side ='right';
    
  } else {
    this.platform.setDir('ltr', true);
    this.side = 'left';
  }
}
public getLang(){
  return this.tarnslateService.currentLang;
}
}
