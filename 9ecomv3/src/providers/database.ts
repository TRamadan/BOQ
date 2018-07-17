import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage}from '@ionic/storage';

import {subcategory} from './sub-categories/sub-categories';
import {Product} from './product/product';
import {Cart} from './cart/cart';
import {Order} from './order/order';
import { RootProvider } from "./root/root";
import { User} from '../templates/user';
import { Category } from './Category/category';






//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////




/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  storage : Storage;
  user : User;
  categories: Category[];
  products: Product[];
  wishproducts: Product[];
  orders: Order[];
  cart: Cart;
  filterTypes: any[];

  cities: string[];
  district: string[];
  countries: string[];
  zipcodes: string[];
  http:Http;

  
  private static instance: Database = null;
  static isCreating: boolean = false;

  // Singleton
  constructor() {
    if (!Database.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.user = new User();
      this.categories = new Array<Category>();
      this.products = new Array<Product>();
      this.wishproducts = new Array<Product>();
      this.orders = new Array<Order>();
      this.filterTypes = new Array<any>();
      this.cities = new Array<string>();
      this.district = new Array<string>();
      this.countries = new Array<string>();
      this.zipcodes = new Array<string>();
      this.initialize();
    }
  }

  static getInstance() {
    console.log('Database Provider');
    if (Database.instance === null) {
      Database.isCreating = true;
      Database.instance = new Database();
      Database.isCreating = false;
    }
    return Database.instance;
  }

  private initialize() {
    console.log('Initialize Database');
    this.countries.push('USA');
    this.district = [
      'New York',
      'California',
      'Indiana',
      'Washington',
    ];
    this.cities = [
      'New York',
      'Los Angeles',
      'San Diego',
      'Seattle',
      'Indianapolis',
      'Oakland'
    ];
    this.zipcodes = [
      '100000',
      '200000',
      '300000'
    ];
    
    let now = new Date();
    let day = 24 * 60 * 60 * 1000;

    
    let id = 'SC' + (new Date(now.getTime() - 2*day)).getTime().toString();
    let date = new Date(now.getTime() - 2*day);
    let status = 'Dispatched';
    this.orders.push(new Order(id ,date , status ));

     id = 'SC' + (new Date(now.getTime() - 3*day)).getTime().toString();
     date = new Date(now.getTime() - 3*day);
     status = 'On Way';
    this.orders.push(new Order(id ,date , status ));

     id = 'SC' + (new Date(now.getTime() - 15*day)).getTime().toString();
     date = new Date(now.getTime() - 15*day);
     status = 'Delivered';
    this.orders.push(new Order(id ,date , status ));
    
 
    
  }

  SaveAll(): void{
    this.user != undefined && this.user.id != "0" ? this.storage.set('user',this.user) : null;
    this.district != undefined && this.district.length > 0 ? this.storage.set('district',this.district): null;
    this.cities != undefined && this.cities.length > 0 ? this.storage.set('cities',this.cities) : null ;
    this.countries != undefined && this.countries.length > 0 ? this.storage.set('countries',this.countries) : null;
    this.zipcodes != undefined && this.zipcodes.length > 0 ? this.storage.set('zipcodes',this.zipcodes) : null;
    this.filterTypes != undefined && this.filterTypes.length > 0 ? this.storage.set('fileterTypes',this.filterTypes) : null;
  }

  allFilters(): any {
    return this.filterTypes;
  }

  allCategory(): Category[] {
    return this.categories;
  }

 

  allWishList(): Product[] {
    console.log(this.wishproducts);
    return this.wishproducts;
  }

  allOrders(): Order[] {
    return this.orders;
  }
  removeWish(wish: Product): void {
    var pos = -1;
    for (var i = 0; i < this.wishproducts.length; i++) {
      if (this.wishproducts[i] === wish) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.wishproducts.splice(pos, 1);
      wish.love = false;
    }
  }
  
  removeProductWish() {
    this.wishproducts.pop();
  }

  addWish(wish): void {
    this.wishproducts.push(wish);
    //console.log(this.wishproducts);
  }

  allCities(): string[] {
    return this.cities;
  }

  alldistrict(): string[] {
    return this.district;
  }
  
  allCountries(): string[] {
    return this.countries;
  }

  allZipCodes(): string [] {
    return this.zipcodes;
  }



  //Delete only one single item from the cart 

  delet_specific_item(prod : Product)
  { 
    let pro = -1;
    for(let i = 0; i < this.products.length; i++)
    {
      if(this.products[i] === prod)
      {
        pro = i;
      } 
      if(pro >= 0)
      {
        this.products.splice(pro , 1);
      }
    }
  }

  

  addOrder(order: Order) {
    this.orders.push(order);

    this.orders = this.orders.sort((a, b) => { return b.date.getTime() - a.date.getTime() });
  }

  parentCategory(): Category[] {
    var parents = this.categories.filter(item => {
      return item.parent === undefined;
    });
    
    parents.forEach(parent => {
      parent.children = new Array<Category>();
      this.categories.forEach(item => {
        if (item.parent == parent.id) {
          parent.children.push(item);
        }
      });
    });
    return parents;
  }

  allProduct(): Product[] {
    return this.products;
  }

  categoryProducts(category: Category): Product[] {
    return this.products;
  }

  public async getItems(){
    try{
      return new Promise((resolve ,reject)=>{
        this.http.get(`${RootProvider.APIURL3}item`).map(res=>res.json()).subscribe(data=>{
          if(data== undefined || data.length == 0)
    {
      return reject([]);
    }
    else{
      let items : Product[] = new Array();
      for(let i = 0 ; i < data.length ; i++){
        items[i] = new Product(data[i].prod_name,data[i].point_id,data[i].prod_sub_category,data[i].prod_image,data[i].prod_image2,data[i].quantity,data[i].measure_unit,data[i].prod_desc,data[i].point_id,data[i].price);
      }
     
        }
      })
    })
    
   
    }
    catch(err){
      console.error(err);

    }
  }


  private async getCategories(){

  }
  private async getSubCategories  (items : Product[]){
    return items;

  }
}
