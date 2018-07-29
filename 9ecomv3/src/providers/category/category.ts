import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {RootProvider} from '../root/root';
import {subcategory} from '../sub-categories/sub-categories';
import {Product}  from '../product/product';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CategoryProvider {

  constructor(public http: Http) {
    console.log('Hello SubCategoriesProvider Provider');
  }

  private async getItems() : Promise<any>{
    return new Promise((resolve ,reject)=>{
      this.http.get(`${RootProvider.APIURL3}item`).map(res=><any>res.json()).subscribe(data=>{
        if(data== undefined || data.length == 0)
  {
     reject([]);
  }
  else{
    let items : Product[] = new Array();
    for(let i = 0 ; i < data.length ; i++){
      items[i] = new Product(data[i].prod_name,data[i].point_id,data[i].prod_sub_category,data[i].prod_image,data[i].prod_image2,data[i].quantity,data[i].measure_unit,data[i].prod_desc,data[i].point_id,data[i].price ,data[i].offer_id , data[i].offer_name);
    }
    resolve(items);
    }
    })

  })
  
}


public async getCategories( ) : Promise<any>{
  let subcat = await this.getSubCategories();
  return new Promise((resolve,reject)=>{
    this.http.get(`${RootProvider.APIURL3}main`).map(res => <any>res.json()).subscribe(data => {
      if (data == null || data.length == 0 || subcat.length ==0) {
       reject([])
      }
      else {
        let catArray = new Array<Category>();
          for (let i = 0; i < data.length; i++) {
            let tempcats = new Array();
            for (let j = 0; j < subcat.length; j++) {

              if (data[i].NewsCategoryID == subcat[j].mainCat) {
                tempcats.push(subcat[j]);

                //console.log(tempcats);
              }
              catArray[i] = new Category(data[i].NewsCategory, data[i].NewsCategoryID, tempcats);
            }


          }
          resolve(catArray);
        //  console.log(this.catArray);
         // this.storage.set("appData", this.catArray);
        
      }
    })
  })

}
private async getSubCategories  () :Promise<any>{
  let items = await this.getItems();
  return new Promise((resolve,reject)=>{
    this.http.get(`${RootProvider.APIURL3}itemtype2`).map(res => <any>res.json()).subscribe(data => {
      if (data == null || data.length == 0 || items.length==0) {
        reject([]);
      }
      else {
        let subcat = new Array()
        for (let i = 0; i < data.length; i++) {
          let Subitems = new Array();
          for (let j = 0; j < items.length; j++) {

            if (data[i].id == items[j].product_subcat) {
              Subitems.push(items[j])
            }
            subcat[i] = new subcategory(data[i].item_type_name, data[i].main_cat_id, data[i].id, data[i].item_type_img, Subitems)
          }


        }
        resolve(subcat);
       // console.log(subcat);

      }
    })
  })

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


