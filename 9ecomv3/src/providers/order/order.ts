import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Order {
  id: string;
  date: Date;
  status: string;
  http : HttpClient
  
  constructor(id="",date= new Date(),status="") {
  this.id=id;
  this.date=date;
  this.status=status;
  }
}
