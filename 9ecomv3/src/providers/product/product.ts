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
  
  
  image2 ? : string;  
  
  measure_u? : string;
  distributerLinkId: string;
  discountPercentage:number;
//////////////////////////////
  
  discount: number = 0;
  image: string; 
  
  //colors: string[];
  //sizes: string[];
  //descriptions: string[];
  categories: Category[]; 
  company_id: string;
  love?: boolean = false;
  status?: string; 
  offer_id : string; 
  offer_name : string; 
  company_name : string;


  /////////////////////////////////
  id: string; //
  name: string; //
  product_subcat ? : number;//
  description? : string;//
  longDescription: string;//
  distributerId : string;//
  showOnHome: boolean;//
  //metaKeywords: string;
  allowCustomerReviews: boolean;//
  approvedRatingSum: number;//
  notApprovedRattingSum: number;//
  isShipEnabled: boolean;//
  isFreeShipping:boolean;//
  additionalShippingCharge: number;//
  DeliveryDateId: string;//
  quant ? : number;//
  orderMaxQuant: number;//
  orderMinQuant: number;//
  price: number;//
  currentPrice: number;//
  isNew: boolean;//
  newFromUTC: Date;
  newToUTC:Date;
  image1 ? : string;//
  specs: Specs//

   constructor(prod_name : string
    , itemId : string
    , prod_sub_category : number
    , quantity : number
    , specs : Specs
    , prod_desc : string
    , distributorId : string
    , price : number
    , longDesc: string
    , showOnHome:boolean
    , allaCustomerReview:boolean
    , approvedRatingSum:number
    , notApprovedRattingSum:number
    , isShipEnabled: boolean
    , isFreeShipping:boolean
    , additionalShippingCharge:number
    , DeliveryDateId:string
    , orderMaxQuant:number
    , orderMinQuant:number
    , oldPrice:number
    , New:boolean
    , newFromUTC: Date
    , newToUTC:Date
    , prod_image1 : string
    , imageMimeType:string
  ) { 
   
    
    
//////////////////////////////////////////////


    this.id = itemId; 
    this.name = prod_name;
    this.description = prod_desc; 
    this.specs =specs;
    this.image1 = ImageProcess.stringToImage(prod_image1,imageMimeType); //'assets/img/categories/girl/jewellery/jewellery01.jpg';
    this.quant = quantity;
    this.distributerId = distributorId;
    this.product_subcat = prod_sub_category;
    this.currentPrice=price;
    this.longDescription=longDesc;
    this.showOnHome=showOnHome;
    this.allowCustomerReviews=allaCustomerReview;
    this.approvedRatingSum=approvedRatingSum;
    this.notApprovedRattingSum=notApprovedRattingSum;
    this.isShipEnabled=isShipEnabled;
    this.isNew=New;
    this.isFreeShipping=isFreeShipping;
    this.additionalShippingCharge=additionalShippingCharge;
    this.DeliveryDateId=DeliveryDateId;
    this.orderMaxQuant=orderMaxQuant;
    this.orderMinQuant=orderMinQuant;
    this.newFromUTC=newFromUTC;
    this.newToUTC=newToUTC;
    this.price=oldPrice;



  }
}


export class Specs{
  weight: number;
  length: number;
  height: number;
  width: number;
  additionalSpecs: Array<specialSpecs>;
  constructor(weight:number,length:number,height:number,width:number,additonalSpecs:Array<specialSpecs>=new Array()){
    this.weight=weight;
    this.length=length;
    this.height=height;
    this.width=width;
    this.additionalSpecs=new Array();
    this.additionalSpecs=additonalSpecs
  }
  
}

export class specialSpecs{
  name:string;
  val:any;
}

export class ImageProcess{

  constructor(){

  }

  static stringToImage(imageData:string,mimeType:string,base:string="base64"):string{
    return "data:"+mimeType+";"+base+","+imageData;
  }
}




