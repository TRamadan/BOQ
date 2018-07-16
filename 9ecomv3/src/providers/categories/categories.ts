import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RootProvider} from '../root/root';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoriesProvider Provider');
  }

}

export class Category{
  public static URLNAME = RootProvider.APIURL3;
  id:string;
  name: string;
  parent?: string;
  children?: any[];
  parentShow?: boolean = false;
  image:String;
  open : boolean;
  constructor(NewsCategory : string = "" , NewsCategoryID : string = "" ,children : any ,NewsCategoryImage : string = "" , Parent : string = "" )
  { 
    this.name = NewsCategory;
    this.id = NewsCategoryID;  
    this.image = (NewsCategoryImage !=null &&NewsCategoryImage.length > 0)?Category.URLNAME+NewsCategoryImage.substring(1,NewsCategoryImage.length) : ""
    this.parentShow = false;
    this.parent = Parent; 
    this.open = false;
    this.children = children? children : new Array();
  }  

  
} 
