import { Component, Input } from '@angular/core';
import { Database } from '../../providers/database';
import { UsersProvider} from '../../providers/users/users';
/**
 * Generated class for the RatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {
  @Input('rating') rating;
  @Input('cCount') customerCount;
  @Input('starts') starCount;
  @Input('rateble') ratable;
  @Input('prodId') prodId;
  text: string;
  fullStarts : number;
  halfStar:boolean;
  emptyStarts:number;
  fullStartsArr :Array<any>;
  emptySartsArr :Array<any>;
  ratedStars:number;
  ratedStarsEmpty:number;
  doneRating:boolean;
  readyToRate : boolean;

  body:string;
  title:string;
  constructor(public userProv : UsersProvider) {
 this.fullStartsArr = new Array();
 this.emptySartsArr = new Array();
 this.body="";
 this.title="";
  }
  ngOnInit(){
    if(this.starCount == null){
      this.starCount =5;
    }
    if(this.ratable == null){
      this.ratable = false;
    }
    this.doneRating=false;
    this.readyToRate=false;
    //console.log(this.rating);

    this.create();
   // console.log(this.fullStarts);
  }

  create(){
   // console.log(this.customerCount);
   // console.log(this.rating);
    if(this.rating > 0 && this.customerCount > 0){
      this.fullStarts = Math.floor(this.rating/this.customerCount);
     // console.log(this.fullStarts);
      this.fullStartsArr.length=this.fullStarts;
      this.emptyStarts = this.starCount-this.fullStarts;
      this.emptySartsArr.length=this.emptyStarts;
     // console.log(this.rating/this.customerCount)
      if((this.rating/this.customerCount)!=this.fullStarts){
        this.halfStar =true;
        this.emptySartsArr.pop();
       // console.log(this.halfStar);
      }else{
        this.halfStar = false
      }
    }
   else{
    this.fullStarts=0;
    this.emptyStarts= this.starCount;
    this.fullStartsArr.length=this.fullStarts;
    this.emptySartsArr.length=this.emptyStarts;
    this.halfStar=false;
   }
   
  }

   rate(index , type){
     let temp = 0;
     if(type == 0){
       temp = index +1
     }else if(type == 1 ){
        temp =this.fullStartsArr.length+1;
      
     }else{
       if(this.halfStar){
         temp= this.fullStartsArr.length+index+2
       }else{
         temp= this.fullStartsArr.length+index+1
       }
       
     }
    // console.log("rating is : "+ temp);
     this.ratedStars=temp;
     this.ratedStarsEmpty=this.starCount-this.ratedStars;
     
     this.fullStartsArr.length=this.ratedStars;
     this.emptySartsArr.length=this.ratedStarsEmpty;
     this.halfStar=false;
     this.readyToRate=true;
     this.doneRating=true;
     
     //console.log('ratedStars Are :'+ this.fullStartsArr.length);
     //console.log('emptyStars are :'+this.emptySartsArr.length);

   }


   async addReview(){
     //console.log(this.body);
    //console.log(this.title);
    let temp = await this.userProv.rate(this.prodId,this.ratedStars,this.body,this.title);
   // console.log(temp);
    }

   





}
