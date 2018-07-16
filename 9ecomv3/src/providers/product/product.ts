import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Category } from '../categories/categories';
import { subcategory } from '../sub-categories/sub-categories';
/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider extends RootProvider {
  constructor(public http: Http) {
    super(http);
  }

  

}


export class Product {
  public static URLNAME = RootProvider.APIURL3;
  id: string;
  product_subcat ? : number;
  image1 ? : string;
  image2 ? : string;  
  quant ? : number;
  measure_u? : string;
  description? : string;
  id2 : number;
  price: number;
//////////////////////////////
  name: string;
  discount: number = 0;
  image: string;
  //colors: string[];
  //sizes: string[];
  //descriptions: string[];
  categories: Category[]; 
  brand?: string;
  love?: boolean = false;
  status?: string; 

   constructor(prod_name : string,point_id : string   , prod_sub_category : number  , prod_image1 : string  , prod_image2 : string  , quantity : number , measure_unit : number , prod_desc : string  , prod_id : number , price : number ) { 
    this.name = prod_name;
    this.id = point_id; 
    this.product_subcat = prod_sub_category;
    this.image1 = (prod_image1 !=null &&prod_image1.length > 0)?subcategory.URLNAME+prod_image1.substring(2,prod_image1.length) : 'assets/img/categories/girl/jewellery/jewellery01.jpg';
    this.image2 = (prod_image2 !=null &&prod_image2.length > 0)?subcategory.URLNAME+prod_image2.substring(2,prod_image1.length) : 'assets/img/categories/girl/jewellery/jewellery01.jpg';
    this.quant = quantity;
    this.measure_u = "measure_unit";
    this.description = "prod_desc"; 
    this.id2 = prod_id;
    this.price = price;
    this.status = "in";
//////////////////////////////////////////////
  //  this.categories = new Array<Category>();
   // this.colors = new Array<string>();
   // this.sizes = new Array<string>();
   // this.descriptions = new Array<string>();
  }
}

