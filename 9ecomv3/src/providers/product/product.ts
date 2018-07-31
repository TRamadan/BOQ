import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Category } from '../category/category';
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
  distributerId : number;
  price: number;
  currentPrice: number;
  distributorId: string;
  distributerLinkId: string;
  discountPercentage:number;
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
  offer_id : string; 
  offer_name : string; 
  company_name : string;

   constructor(prod_name : string,itemId : string , prod_sub_category : number  , prod_image1 : string  , prod_image2 : string  , quantity : number , measure_unit : string , prod_desc : string  , distributorId : number , price : number  , offer_id : string , offer_name : string,discount_percentage:number,item_distributor_id:string) { 
    this.name = prod_name;
    this.id = itemId; 
    this.product_subcat = prod_sub_category;
    this.image1 = (prod_image1 !=null &&prod_image1.length > 0)?subcategory.URLNAME+prod_image1.substring(2,prod_image1.length) : 'assets/img/categories/girl/jewellery/jewellery01.jpg';
    this.image2 = (prod_image2 !=null &&prod_image2.length > 0)?subcategory.URLNAME+prod_image2.substring(2,prod_image1.length) : 'assets/img/categories/girl/jewellery/jewellery01.jpg';
    this.quant = quantity;
    this.measure_u = measure_unit;
    this.description = prod_desc; 
    this.distributerId = distributorId;
    this.price = price;
    this.status = "in"; 
    this.offer_id  = offer_id; 
    this.offer_name = offer_name;
    this.discountPercentage = discount_percentage;
    this.distributerLinkId=item_distributor_id;
    this.currentPrice=this.discountPercentage == null ? this.price : (this.price-((this.price*this.discountPercentage)/100));
//////////////////////////////////////////////
   //  this.categories = new Array<Category>();
   // this.colors = new Array<string>();
   // this.sizes = new Array<string>();
   // this.descriptions = new Array<string>();
  }
}

