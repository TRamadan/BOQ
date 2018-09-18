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

  public async getCompany() : Promise<any>{
    return new Promise((resolve)=>{
      let tempData=`${RootProvider.APIURL3}company`;
      console.log(tempData);
      this.http.get(tempData).map(res=><any>res.json()).subscribe(
        data=>{
          if(data ==undefined || data.length == 0 ){
            resolve([])
          }else{
            let comps = new Array<Company>();
            for(let i = 0;i < data.length ; i++){
              comps.push(new Company(data[i].PointName,data[i].PointID,data[i].PointCategory,data[i].main_category_name,data[i].PointDesc,data[i].PointAddress,data[i].company_address_ar,data[i].PointPhone,data[i].company_phone2,data[i].PointLong,data[i].PointLatt))
            }
            console.log(comps);
            resolve(comps);
          }
        }
      )
    })
  }

  private async getItems() : Promise<any>{
    let comps = <Array<Company>> await this.getCompany();
    return new Promise((resolve)=>{
      console.log(`${RootProvider.APIURL3}item`);
      this.http.get(`${RootProvider.APIURL3}item`).map(res=><any>res.json()).subscribe(data=>{
        if(data== undefined || data.length == 0)
  {
     resolve([]);
  }
  else{
    let items : Product[] = new Array();
    for(let i = 0 ; i < data.length ; i++){
      items[i] = new Product(data[i].item_name,data[i].item_id,data[i].item_type_id,data[i].item_img1,data[i].item_img2,data[i].inventory,data[i].measure_unit,data[i].item_long_desc,data[i].distributor_id,data[i].price ,data[i].offer_id , data[i].offer_name,data[i].discount_percentage,data[i].item_distributor_id,data[i].company_id);
      for(let j = 0 ; j< comps.length ; j++){
        if(items[i].company_id == comps[j].id){
          items[i].company_name = comps[j].name;
          break;
        }
      }
    }
    resolve(items);
    }
    })

  })
  
}


public async getCategories( ) : Promise<any>{
  let subcat = await this.getSubCategories();
  return new Promise((resolve)=>{
    this.http.get(`${RootProvider.APIURL3}main`).map(res => <any>res.json()).subscribe(data => {
      if (data == null || data.length == 0 || subcat.length ==0) {
       resolve([])
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
              catArray[i] = new Category(data[i].NewsCategory, data[i].NewsCategoryID, tempcats,data[i].NewsCategoryImage);
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
  return new Promise((resolve)=>{
    this.http.get(`${RootProvider.APIURL3}subcat`).map(res => <any>res.json()).subscribe(data => {
      if (data == null || data.length == 0 || items.length==0) {
        resolve([]);
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

/**
 * new parameters for category from the final api
 * 
 * 
Description	
CategoryTemplateId	
MetaKeywords	
MetaDescription	
MetaTitle	
ParentCategoryId	
PictureId	
PageSize	
AllowCustomersToSelectPageSize	
PageSizeOptions	
PriceRanges	
ShowOnHomePage	
IncludeInTopMenu	
SubjectToAcl	
LimitedToStores	
Published	     
Deleted	
DisplayOrder	
CreatedOnUtc	
UpdatedOnUtc
 */

export class Category{ 

  public static URLNAME = RootProvider.APIURL3;
  id:string;
  name: string;
  parent?: string;
  children?: any[];
  parentShow?: boolean = false;
  image:String;
  open : boolean;
  catetemplateID : string;
  description : string; 
  published : boolean;

  constructor(Name : string = "" , ID : string = "" ,children : any ,NewsCategoryImage : string = "" , Parent : string = "" , Description : string = "")
  { 
    this.name = Name;
    this.id = ID;  
    this.image = (NewsCategoryImage !=null &&NewsCategoryImage.length > 0)?RootProvider.imageUrl+NewsCategoryImage.substring(1,NewsCategoryImage.length) : ""
    this.parentShow = false;
    this.parent = Parent; 
    this.open = false;
    this.children = children? children : new Array(); 
    this.description = Description;

  }
  

  
}

export class Company{
  name: string;
  id: string;
  nameAr: string;
  descr: string;
  address: string;
  addressAr: string;
  phone: string;
  phone2: string;
  categoryId: string;
  logo: string;
  long: string;
  latt: string;
  categoryName: string;

  constructor(name:string
    ,id:string
    ,categoryId:string
    ,categortName:string
    ,descr: string = ""
    ,address: string = ""
    ,addressAr: string = ""
    ,phone: string = ""
    ,phone2:string = ""
    ,long: string = ""
    ,latt: string = ""
    
  ){
    this.name = name;
    this.id= id;
    this.categoryId = categoryId;
    this.categoryName = categortName;
    this.descr = descr;
    this.address = address;
    this.addressAr = addressAr;
    this.phone = phone;
    this.phone2 = phone2;
    this.logo = long;
    this.latt = latt;

  }
}


