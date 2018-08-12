import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {RootProvider} from '../root/root';
/*
  Generated class for the SubCategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubCategoriesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SubCategoriesProvider Provider');
  }

}


export class subcategory{
  public static URLNAME = RootProvider.APIURL3;
  id : string; 
  name : string;
  image : string;
  NewsCategoryID : string;
  Items : any[]
  mainCat : any;
 
  constructor(item_type_name : string = "" ,main_cat_id :string ,item_type_id : string = "" , item_type_img: string = "", items :any , NewsCategoryID : string = "-1" )
  {
    this.name = item_type_name; 
    this.id = item_type_id;
    this.mainCat = main_cat_id;
    this.image = (item_type_img !=null &&item_type_img.length > 0)?RootProvider.imageUrl+item_type_img.substring(1,item_type_img.length) : ""; 
    this.Items= items ? items : new Array();
  } 
}
