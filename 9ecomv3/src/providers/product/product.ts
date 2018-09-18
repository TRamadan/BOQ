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
  id: string;

  productSubcat:string;

  images: Array<ImageConverter>;
  quant: number;
  shortDescr: string;
  fullDescr: string;
  distributerId: string;
  price: number;
  currentPrice: number;
  distributerLinkId: string;
  discountPercentage:number;
  name: string;
  companyId:string;
  companyName: string;
  love: boolean = false;
  status?: string; 
  //offer_id: string; 
  //offer_name: string;
  approvedRatingSum:number;
  notApprovedRatingSum:number;
  isFreeShipping:boolean;
  orderMinimumQuantity:number;
  orderMaximumQuantity:number;
  isNew :boolean;
  specs:Specs;


   constructor(ProductTypeId:string
    ,Name:string
    ,ShortDescription:string
    ,FullDescription:string
    ,VendorId:string
    ,ApprovedRatingSum:number
    ,NotApprovedRatingSum:number
    ,StockQuantity:number
    ,OrderMinimumQuantity:number
    ,OrderMaximumQuantity:number
    ,Price:number
    ,OldPrice:number
    ,Weight:number
    ,Length:number
    ,Width:number
    ,Height:number
    ,CategoryId:string
    ,ManufacturerId:string
    ,MimeType:string
    ,PictureBinary:string
    ,IsNew:boolean
  ) { 
    this.images = new Array<ImageConverter>();
    
    this.name = Name;
    this.id = ProductTypeId; 
    this.shortDescr = ShortDescription;
    this.fullDescr = FullDescription;

    this.productSubcat = CategoryId;
    this.images.push(new ImageConverter(MimeType,PictureBinary));
    //this.image1 = (prod_image1 !=null &&prod_image1.length > 0)?RootProvider.imageUrl+prod_image1.substring(2,prod_image1.length) : 'assets/img/categories/girl/jewellery/jewellery01.jpg';
    //this.image2 = (prod_image2 !=null &&prod_image2.length > 0)?RootProvider.imageUrl+prod_image2.substring(2,prod_image1.length) : 'assets/img/categories/girl/jewellery/jewellery01.jpg';
    
    this.quant = StockQuantity;
    this.orderMaximumQuantity = OrderMaximumQuantity;
    this.orderMinimumQuantity = OrderMinimumQuantity;
    this.distributerId = VendorId;

    this.price = OldPrice;
    this.currentPrice = Price;
    this.approvedRatingSum = ApprovedRatingSum;
    this.notApprovedRatingSum = NotApprovedRatingSum;
    this.companyId= ManufacturerId;
    this.isNew = IsNew;

    this.specs = new Specs(Width,Length,Weight,Height);

  }
}

export class Specs{
  Width: number;
  Length: number;
  Weight: number;
  Height: number;
  additionlSpecs: Array<SpecialSpec>;
  constructor(Width,Length,weight,height){
    this.Weight=weight;
    this.Width=Width;
    this.Length=Length;
    this.Height=height
    this.additionlSpecs= new Array<SpecialSpec>();
  }

}

export class SpecialSpec{
  name: string;
  value: any;
  constructor(){

  }
}

class ImageConverter{
  base: string;
  mimeType: string;
  imageData: string;
  constructor(mimeType:string,imageData,base:string="base64"){
    this.base = base;
    this.mimeType = mimeType;
    this.imageData = imageData;
  }
  Create(){
    return "data:"+this.mimeType+";"+this.base+","+this.imageData;
  }
}

