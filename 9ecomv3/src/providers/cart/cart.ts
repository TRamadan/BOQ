import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Product} from '../product/product';
/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class Cart {
  products: Array<CartProduct>;
  deliveryType: string;
  delivery: number;
  promotion: number = 0;
  private static instance: Cart = null;
  static isCreating: boolean = false;
  public storage : Storage = new Storage({});

  // Singleton
  constructor() {
    if (!Cart.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.products = new Array<CartProduct>();
      this.storageGet();
    }
  }


  static getInstance() {
    console.log('Cart Provider');
    if (Cart.instance === null) {
      Cart.isCreating = true;
      Cart.instance = new Cart();
      Cart.isCreating = false;
    }
    return Cart.instance;
  }

  clear() {
    this.products = new Array<CartProduct>();
    this.storageSave();
    this.deliveryType = ''
    this.delivery = 0;
    this.promotion = 0;
  }

  public removeItem(index : any,isDelete:boolean=true){
    if(isDelete){
      if(this.products.length==1){
        this.products.pop();
        
          
      }else{
        let counter = index+1;
        for(let i = index ; i<this.products.length-1;i++){
          this.products[i]=this.products[counter++];
          
          
          
          } 
          this.products.pop();
  
          
        }
    }else{
      if(this.products[index].quantity!=1){
        this.products[index].quantity = this.products[index].quantity-1;
      }
      
    }
    
      this.storageSave();
      
    
    
  }

  storageSave(){
    this.storage.ready().then(data=>{
      this.storage.set('cart',this.products);
    }
    )
  }
  storageGet(){
    this.storage.ready().then(data=>{
      this.storage.get('cart').then(data=>{
        if(data!= null){
          this.products = data;
        }else{
          this.products = new Array<CartProduct>();
        }
        
      });
    }
    )
  }


  public addItem(product: Product){
    let flgFound = false;
    this.products.forEach(specific_item => {

      if (specific_item.product != undefined && specific_item.product.id == product.id) {
        flgFound = true;
        specific_item.quantity = parseInt(specific_item.quantity.toString()) + 1;
      }
      
    })
    
    if (!flgFound) {
      this.products.push(<CartProduct>{ product: product, quantity: 1 });
    }
    
    this.storageSave();
  }
 


  count(): number {
    let sum: number = 0;
    this.products.forEach(product => {
      sum = parseInt(sum.toString()) + parseInt(product.quantity.toString());
    });
    return sum;
  }

  total(): number {
    let sum: number = 0;
    this.products.forEach(item => {
      sum = parseInt(sum.toString()) + (parseInt(item.quantity.toString()) * (item.product.currentPrice ));
    });

    return sum;
  }

  promoTotal(): number {
    let sum: number = 0;
    this.products.forEach(item => {
      sum = parseInt(sum.toString()) + (parseInt(item.quantity.toString()) * (item.product.currentPrice));
    });
    sum = parseInt(sum.toString()) - parseInt(this.promotion.toString());
    return sum;
  }
}


export interface CartProduct {
  product : Product;
  quantity: number;
}

