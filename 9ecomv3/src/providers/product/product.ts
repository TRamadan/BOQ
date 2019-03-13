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
  private getReviewsAPiController:string ='product/';
  private getReviewsActionString: string ='get_comments?';
  constructor(public http: Http) {
    super(http);
  }

  public weightRatio(width:number,height:number,length:number,weight : number){
    let weightRatio =  ((width*height*length)/200) ;
    return weightRatio > weight ? weightRatio : weight ;

  }

  getReviews(prodId:string):Promise<any>{
    let temp = `${RootProvider.APIURL4}${this.getReviewsAPiController}${this.getReviewsActionString}ProductId=${prodId}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        if(data != null && data.length >0){
          let reviews = new Array<review>();
          for(let i = 0 ; i< data.length;i++){
            reviews.push(new review(data[i].Username,data[i].ReviewText,data[i].Title,data[i].CreatedOnUtc));
          }
          resolve(reviews)
        }else{
          resolve([])
        }
      },err=>{
        console.log(err);
        resolve([])
      })
    })

  }

  

}


export class Product {

  
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
  company_name : string;//
  rating: number ; //
  customerCount: number;//

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
    , rating:number
    , customerCount:number
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
    this.rating = (rating == null)? 0 : rating;
    this.customerCount = customerCount;



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
    this.additionalSpecs=additonalSpecs;
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

export class review{
  writerName:string;
  reviewTitle: string;
  reviewBody:string;
  creationDate:Date;
  constructor(wName:string,rTitle:string,rBody:string,date:Date){
    this.writerName = wName;
    this.reviewTitle = rTitle;
    this.reviewBody = rBody;
    this.creationDate = date;
  }

}




