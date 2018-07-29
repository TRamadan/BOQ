
import { Injectable } from '@angular/core';

/*
  Generated class for the FiltersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FiltersProvider {
  comparsonTypes:  Array<Comparsontype>;
  filterTypes: Array<FilterTypes>;

  constructor() {
    console.log('Hello FiltersProvider Provider');
    this.init();
  }
  public init(){
    this.comparsonTypes = new Array();
    this.filterTypes =new Array();
    this.comparsonTypes.push(new Comparsontype("singleVal",'=' ,0));
    this.comparsonTypes.push(new Comparsontype("twoVal","<>",1));
    let filter  = new Array();
    filter.push(new Filter("1 EP",1));
    filter.push(new Filter("50 EP",50));
    filter.push(new Filter("100 EP",100));
    filter.push(new Filter("150 Ep",150));
    filter.push(new Filter("200 EP",200));
    this.filterTypes.push(new FilterTypes("Price",this.comparsonTypes[1],filter));
  }

  public addFiltertype(filterType : FilterTypes){
    this.filterTypes.push(filterType);
  }

}

export class FilterTypes{
  filterTypeName : string;
  selected : boolean;
  comparsonType : Comparsontype;
  filter : Array<Filter>;
  constructor(filterTypename : string,comparsonType:Comparsontype , filter: Array<Filter>,){
    this.filter= new Array();
    this.filterTypeName= filterTypename;
    this.filter =filter;
    this.comparsonType = comparsonType;
    this.selected= false;
    
  }


}

export class keyValObject{
  typeName: string;
  val : any;

  constructor(typename: string , val:any){
    this.typeName= typename;
    this.val = val;
  }



}

export class Comparsontype extends keyValObject{
  filterFormat : number;
  constructor(typename : string ,  val : string , filterFormat : number){
    super(typename,val)
    this.filterFormat = filterFormat;
  }

}
export class Filter extends keyValObject{
  selected : boolean;

  constructor(typename: string , val:any){
    super(typename,val);
    this.selected=false;
  }
}

