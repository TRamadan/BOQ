import {AutoCompleteService} from 'ionic2-auto-complete';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Database} from '../database';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider implements AutoCompleteService{
  public  allSearchable:Array<searchable>;
  labelAttribute = "name";
  formValueAttribute ="";
  constructor(public http: HttpClient) {
    console.log('Hello SearchProvider Provider');
  }
  
  setSearchbleData(){
    let db = Database.getInstance();
    this.allSearchable = new Array<searchable>();
    for(let i =0;i<db.categories.length;i++){
      
      this.allSearchable.push(new searchable(db.categories[i],'category','SubCateListPage',db.categories[i]))
      //pageParm.pop()
    }
    //pageParm.pop();
    return this.allSearchable;

  }
  addSearchable(Object:any,type:string,pageRedirect:any,pageParms:any){
    this.allSearchable.push(new searchable(Object,type,pageRedirect,pageParms));

  }


  getResults(keyWord:string)
  {
    console.log(this.allSearchable.filter(item => item.searchableObject.name.toLowerCase().startsWith(keyWord.toLowerCase()) ));
    return this.allSearchable.filter(item => item.searchableObject.name.toLowerCase().startsWith(keyWord.toLowerCase()) )

  }
}

export class searchable{
  searchableObject : any;
  type: string;
  pageLocation: any;
  pageParameters:any;
  constructor(Object:any,type:string,pageLocation:any,pageParameters:any){
    this.searchableObject=Object;
    this.type = type;
    this.pageLocation = pageLocation;
    this.pageParameters=pageParameters;
  }

}

// export class pageParms{
//   key:string;
//   val:any;
//   constructor(key:string,val:any){
//     this.key=key;
//     this.val=val;
//   }
//   public toJson(){
//     let str1 = this.key + " : " + JSON.stringify(this.val);
//     return JSON.stringify(str1);
//   }
// }
