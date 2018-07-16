import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs/add/operator/map';

import {Category} from'./categories/categories';
import {subcategory} from './sub-categories/sub-categories';
import {Product} from './product/product';
import {Cart,WishProduct,Order} from './cart/cart';
import { RootProvider } from "./root/root";
import { User ,Address } from '../templates/user';






//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////




/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  user : User;
  categories: Category[];
  products: Product[];
  wishproducts: WishProduct[];
  orders: Order[];
  cart: Cart;
  filterTypes: any[];

  cities: string[];
  states: string[];
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
      this.wishproducts = new Array<WishProduct>();
      this.orders = new Array<Order>();
      this.filterTypes = new Array<any>();
      this.cities = new Array<string>();
      this.states = new Array<string>();
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
    this.states = [
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
    this.orders = [
      {
        id: 'SC' + (new Date(now.getTime() - 2*day)).getTime().toString(),
        date: new Date(now.getTime() - 2*day),
        status: 'Dispatched'
      },
      {
        id: 'SC' + (new Date(now.getTime() - 3*day)).getTime().toString(),
        date: new Date(now.getTime() - 3*day),
        status: 'On Way'
      },
      {
        id: 'SC' + (new Date(now.getTime() - 15*day)).getTime().toString(),
        date: new Date(now.getTime() - 15*day),
        status: 'Delivered'
      },
    ];
 
    this.filterTypes = [
      {
        name: 'Price',
         selected: true,
        type: 'or',
        filters: [
          {
            title: 'Less than $50',
            attr: 'price',
            compare: 'range',
            min: 1,
            max: 50,
            checked: false
          },
          {
            title: 'From $50 to $150',
            attr: 'price',
            compare: 'range',
            min: 50,
            max: 150,
            checked: false
          },
          {
            title: 'From $150 to $250',
            attr: 'price',
            compare: 'range',
            min: 150,
            max: 250,
            checked: false
          },
          {
            title: 'From $250 to $500',
            attr: 'price',
            compare: 'range',
            min: 250,
            max: 500,
            checked: false
          },
        ]
      },
      {
        name: 'Brand',
        selected: false,
        type: 'and',
        filters: [
          {
            title: 'Zaza',
            attr: 'brand',
            compare: 'equal',
            value: 'Zaza',
            checked: false
          },
          {
            title: 'Mango',
            attr: 'brand',
            compare: 'equal',
            value: 'Mango',
            checked: false
          },
          {
            title: 'PT2000',
            attr: 'brand',
            compare: 'equal',
            value: 'PT2000',
            checked: false
          },
          {
            title: 'Blue Exchange',
            attr: 'brand',
            compare: 'equal',
            value: 'Blue Exchange',
            checked: false
          },
          {
            title: 'Hoang Phuc',
            attr: 'brand',
            compare: 'equal',
            value: 'Hoang Phuc',
            checked: false
          },
        ]
      },
      {
        name: 'Size',
        selected: false,
        type: 'and',
        filters: [
          {
            title: 'Has S Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'S',
            checked: false
          },
          {
            title: 'Has M Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'M',
            checked: false
          },
          {
            title: 'Has L Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'L',
            checked: false
          },
          {
            title: 'Has XL Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'XL',
            checked: false
          },
          {
            title: 'Has XXL Size',
            attr: 'sizes',
            compare: 'equal',
            value: 'XXL',
            checked: false
          },
        ]
      },
      {
        name: 'Color',
        selected: false,
        type: 'and',
        filters: [
          {
            title: 'Has Green Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Green',
            checked: false
          },
          {
            title: 'Has Orange Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Orange',
            checked: false
          },
          {
            title: 'Has Pink Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Pink',
            checked: false
          },
          {
            title: 'Has Blue Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Blue',
            checked: false
          },
          {
            title: 'Has Cyan Color',
            attr: 'colors',
            compare: 'equal',
            value: 'Cyan',
            checked: false
          }
        ]
      },
      {
        name: 'Discount',
        selected: false,
        type: 'or',
        filters: [
          {
            title: 'Discount 10%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 10,
            checked: false
          },
          {
            title: 'Discount 25%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 25,
            checked: false
          },
          {
            title: 'Discount 50%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 50,
            checked: false
          },
          {
            title: 'Discount 90%',
            attr: 'discount',
            compare: 'range',
            min: 1,
            max: 90,
            checked: false
          }
        ]
      }
    ];
  }

  allFilters(): any {
    return this.filterTypes;
  }

  allCategory(): Category[] {
    return this.categories;
  }

 

  allWishList(): WishProduct[] {
    console.log(this.wishproducts);
    return this.wishproducts;
  }

  allOrders(): Order[] {
    return this.orders;
  }
  removeWish(wish: WishProduct): void {
    var pos = -1;
    for (var i = 0; i < this.wishproducts.length; i++) {
      if (this.wishproducts[i] === wish) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.wishproducts.splice(pos, 1);
      wish.product.love = false;
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

  allStates(): string[] {
    return this.states;
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
