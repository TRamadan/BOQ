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

  constructor(public http: HttpClient,private tarnslateService : TranslateService , private platform : Platform) {
    this.translateHttpLoader = new TranslateHttpLoader(http);
    this.langs = new Array();
    this.langs.push('en');
    this.langs.push('ar');
    this.tarnslateService.setDefaultLang('en');
  }
switchLang(lang : string = 'en'){
  this.tarnslateService.use(lang);
  this.changeDir(lang);
}
public changeDir(lang) {
  if (lang === 'ar') {
    this.platform.setDir('rtl', true);
    
    
  } else {
    this.platform.setDir('ltr', true);
    
  }
}
}
