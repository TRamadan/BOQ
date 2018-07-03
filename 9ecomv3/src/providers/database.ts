import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



export class Category{
  private static URLNAME = "http://services.edge-techno.com/boq_v2";
  id:string;
  name: string;
  parent?: string;
  children?: Category[];
  parentShow?: boolean = false;
  image:String;
  open : boolean;
  constructor(NewsCategory : string = "" , NewsCategoryID : string = "" , NewsCategoryImage : string = "" , Parent : string = "")
  { 
    this.name = NewsCategory;
    this.id = NewsCategoryID;  
    this.image = (NewsCategoryImage !=null &&NewsCategoryImage.length > 0)?Category.URLNAME+NewsCategoryImage.substring(1,NewsCategoryImage.length) : ""
    this.parentShow = false;
    this.parent = Parent; 
    this.open = false;
    this.children = new Array();
  }  

  
} 
//////////////////////////////////////////////////////////////////////////////
export class subcategory{
  private static URLNAME = "http://services.edge-techno.com/boq_v2"
  id : string; 
  name : string;
  image : string;
  NewsCategoryID : string;
  
  constructor(item_type_name : string = "" , item_type_id : string = "" , item_type_img: string = "" , NewsCategoryID : string = "-1")
  {
    this.name = item_type_name; 
    this.id = item_type_id;
    this.image = (item_type_img !=null &&item_type_img.length > 0)?subcategory.URLNAME+item_type_img.substring(1,item_type_img.length) : ""
  }
}
//////////////////////////////////////////////////////////////////////////////

export class Product {
  id: string;
  product_subcat ? : number;
  image1 ? : string;
  image2 ? : string;  
  quant ? : number;
  measure_u? : number;
  description? : string;
  id2 : number;
  price: number;
//////////////////////////////
  name: string;
  discount: number = 0;
  image: string;
  colors: string[];
  sizes: string[];
  descriptions: string[];
  categories: Category[]; 
 
  brand?: string;
  love?: boolean = false;
  status?: string; 
  
  

  constructor(point_id : string = ""  , prod_sub_category : number  , prod_image1 : string = "" , prod_image2 : string = "" , quantity : number , measure_unit : number , prod_desc : string = "" , prod_id : number , price : number ) { 
    this.id = point_id; 
    this.product_subcat = prod_sub_category;
    this.image1 = prod_image1; 
    this.image2 = prod_image2; 
    this.quant = quantity;
    this.measure_u = measure_unit;
    this.description = prod_desc; 
    this.id2 = prod_id;
    this.price = price;
    
//////////////////////////////////////////////
    this.categories = new Array<Category>();
    this.colors = new Array<string>();
    this.sizes = new Array<string>();
    this.descriptions = new Array<string>();
  }
}

export class Address {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface WishProduct {
  product: Product;
  color?: string;
  size?: string;
}

export interface CartProduct extends WishProduct {
  quantity: number;
}

export class Order {
  id: string;
  date: Date;
  status: string;
}

@Injectable()
export class Cart {
  products: Array<CartProduct>;
  deliveryType: string;
  delivery: number;
  promotion: number = 0;
  private static instance: Cart = null;
  static isCreating: boolean = false;

  // Singleton
  constructor() {
    if (!Cart.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.products = new Array<CartProduct>();
      this.initialize();
    }
  }

  private initialize() {
    let db = Database.getInstance();
    let products = db.allProduct();

    this.products.push({ product: products[0], quantity: 2, color: 'Green', size: 'M' })
    this.products.push({ product: products[1], quantity: 1, color: 'Pink', size: 'L' })
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
    this.deliveryType = ''
    this.delivery = 0;
    this.promotion = 0;
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
      sum = parseInt(sum.toString()) + (parseInt(item.quantity.toString()) * (item.product.price - item.product.discount));
    });

    return sum;
  }

  promoTotal(): number {
    let sum: number = 0;
    this.products.forEach(item => {
      sum = parseInt(sum.toString()) + (parseInt(item.quantity.toString()) * (item.product.price - item.product.discount));
    });
    sum = parseInt(sum.toString()) - parseInt(this.promotion.toString());
    return sum;
  }
}
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  categories: Category[];
  products: Product[];
  addresses: Address[];
  wishproducts: WishProduct[];
  orders: Order[];
  filterTypes: any[];

  cities: string[];
  states: string[];
  countries: string[];
  zipcodes: string[];
  private static instance: Database = null;
  static isCreating: boolean = false;

  // Singleton
  constructor() {
    if (!Database.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.categories = new Array<Category>();
      this.products = new Array<Product>();
      this.addresses = new Array<Address>();
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
    this.addresses = [
      {
        firstname: 'John',
        lastname: 'Smith',
        address: '701, Block -  B, Siddhi Vinayak Tower',
        phone: '+91 1234 5678 99',
        city: this.cities[1],
        state: this.states[1],
        country: this.countries[0],
        zipcode: '100000'
      },
      {
        firstname: 'Vernon',
        lastname: 'Martin',
        address: '925 Buddy Motorway, New Street',
        phone: '+91 1234 5678 99',
        city: this.cities[0],
        state: this.states[0],
        country: this.countries[0],
        zipcode: '200000'
      },
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
   /*
    this.categories = [
      // Girl Collection
      {
        id: '0100',
        name: `Women's Wear`,
        parentShow: false,
        image : 'ffssf'
      },
  
    ];
*/  

    /*
    this.products = [
      // Western wear
      {
        id: '0001',
        name: `Round Neck Dress`,
        price: 50,
        discount: 5,
        image: 'assets/img/categories/girl/western/western01.png',
        colors: ['Green', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL'],
        descriptions: [],
        categories: [this.categories[2]],
        love: true,
        status: 'in'
      },
      {
        id: '0002',
        name: `Red Blue Striped Top`,
        price: 65,
        discount: 15,
        image: 'assets/img/categories/girl/western/western02.png',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: ['Simple full sleeves', 'Casual fit that is true to size'],
        categories: [this.categories[2]],
        love: true,
        status: 'out'
      },
      {
        id: '0003',
        name: `Blue Striped Top`,
        price: 59,
        discount: 11,
        image: 'assets/img/categories/girl/western/western03.png',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]],
        love: true,
        status: 'in'
      },
      {
        id: '0004',
        name: `Green Crop T-Shirt`,
        price: 39,
        discount: 3,
        image: 'assets/img/categories/girl/western/western04.png',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]]
      },
      {
        id: '0005',
        name: `Marchesa Peony Dress`,
        price: 250,
        discount: 20,
        image: 'assets/img/categories/girl/western/western05.jpg',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]]
      },
      {
        id: '0006',
        name: `Floral-Lace Cocktail Dress`,
        price: 190,
        discount: 0,
        image: 'assets/img/categories/girl/western/western06.jpg',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]]
      },
      {
        id: '0007',
        name: `Bryx Ivory`,
        price: 210,
        discount: 5,
        image: 'assets/img/categories/girl/western/western07.jpg',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]]
      },
      {
        id: '0008',
        name: `Carrot Jeans with straps`,
        price: 210,
        discount: 5,
        image: 'assets/img/categories/girl/western/western08.jpg',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]]
      },
      {
        id: '0009',
        name: `Casual Slim Strap Jeans`,
        price: 210,
        discount: 5,
        image: 'assets/img/categories/girl/western/western09.jpg',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [''],
        categories: [this.categories[2]]
      },
      {
        id: '0010',
        name: `Ladies Trousers Suspenders`,
        price: 210,
        discount: 5,
        image: 'assets/img/categories/girl/western/western10.jpg',
        colors: ['Green', 'Orange', 'Pink', 'Blue', 'Cyan'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[2]]
      },
      // Wallet & Bags
      {
        id: '0011',
        name: `Leather school satchel`,
        price: 110,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      {
        id: '0012',
        name: `Messenger Hobo Handbag`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag02.jpg',
        colors: [],
        sizes: [],
        descriptions: ['New with tags condition', 'Sold by yytmall',],
        categories: [this.categories[1]]
      },
      {
        id: '0013',
        name: `Ladies Handbags Mango`,
        brand: 'Mango',
        price: 210,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag03.jpg',
        colors: ['Black', 'White'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      {
        id: '0014',
        name: `Rebecca Unlined Tote`,
        price: 50,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag04.jpg',
        colors: ['White', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      {
        id: '0015',
        name: `Fashion Women Bags Set`,
        price: 80,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag05.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      {
        id: '0016',
        name: `Handbag Women's Bag 4 in 1 Set`,
        price: 110,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag06.jpg',
        colors: ['Brown', 'White'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      {
        id: '0017',
        name: `School Bag for Girl`,
        price: 45,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag07.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      {
        id: '0018',
        name: `Sling Bags for Women`,
        price: 60,
        discount: 5,
        image: 'assets/img/categories/girl/bag/bag08.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[1]]
      },
      // Jewellery
      {
        id: '0019',
        name: `White Gold Ring For Girl`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0020',
        name: `Index Finger Ring Girl Jewelry`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery02.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0021',
        name: `Wedding White Gold Rings`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery03.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0022',
        name: `Fashion Necklace for Lady`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery04.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0023',
        name: `Women Barrettes Hairpins Set`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery05.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0024',
        name: `Thin Blue Line Bow, Ring Tattoo`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery06.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0025',
        name: `Costume Jewelry Multi Crystal Bib Temperament Necklace`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery07.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0026',
        name: `Silver Key Pendant Lady Jewelry Sweater Chain Necklace`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery08.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0027',
        name: `Girls Silver Wedding Rings`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery09.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      {
        id: '0028',
        name: `Cool Necklaces for Lady`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/jewellery/jewellery10.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[3]]
      },
      // Accessories
      {
        id: '0029',
        name: `Forehead jewelry`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories01.jpg',
        colors: ['Orange', 'Pink', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0030',
        name: `Indian head jewelry`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories02.jpg',
        colors: ['Orange', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0031',
        name: `Pendant high forehead women indian`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories03.jpg',
        colors: ['Orange', 'Pink', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0032',
        name: `Tassel Head Chain Hair Decoration`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories04.jpg',
        colors: ['Orange', 'Pink', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0033',
        name: `Hair jewelry headband`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories05.jpg',
        colors: ['Orange', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0034',
        name: `Goldtone Metal Head Chain Studs`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories06.jpg',
        colors: ['Orange', 'Pink', 'Black'],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0035',
        name: `Bohemian Hippie headband`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories07.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      {
        id: '0036',
        name: `Gold Plated Pearl Stone Hair Pin`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/accessories/accessories08.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[4]]
      },
      // Cosplay
      {
        id: '0037',
        name: `Monarch Fairy Costume`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay01.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0038',
        name: `Fairytale Fancy Dress`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay02.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0039',
        name: `Sexy Demon Outfit Lady Halloween Costume`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay03.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0040',
        name: `Red Vampire Halloween Costume`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay04.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0041',
        name: `Sexy vampire costumes for girls`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay05.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0042',
        name: `Vampire halloween costumes for girls`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay06.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0043',
        name: `Teen Evil Pixie Costume`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay07.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0044',
        name: `Sexy Butterfly Halloween Costume`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay08.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0045',
        name: `Pumpkin Witch Pirate Costumes For Ladies`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay09.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0046',
        name: `Sexy Arabian Seductress Adult Costume`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay10.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0047',
        name: `Gothic Punk Rock Vampire Queen`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay11.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      {
        id: '0048',
        name: `Masquerade Vampire Queen`,
        price: 120,
        discount: 5,
        image: 'assets/img/categories/girl/cosplay/cosplay12.jpg',
        colors: [],
        sizes: [],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[5]]
      },
      // Man 
      // Casual 
      {
        id: '0049',
        name: `Blue Suits Fashion Formal Dress Men`,
        price: 150,
        discount: 5,
        image: 'assets/img/categories/man/casual/casual01.jpg',
        colors: ['Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[7]]
      },
      {
        id: '0050',
        name: `Brown jacket Men's Fashion`,
        price: 150,
        discount: 5,
        image: 'assets/img/categories/man/casual/casual02.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[7]]
      },
      {
        id: '0051',
        name: `Business Mens Suits Custom`,
        price: 150,
        discount: 5,
        image: 'assets/img/categories/man/casual/casual03.jpg',
        colors: ['Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[7]]
      },
      {
        id: '0052',
        name: `Havana jacket`,
        price: 150,
        discount: 5,
        image: 'assets/img/categories/man/casual/casual07.jpg',
        colors: ['Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[7]]
      },
      {
        id: '0053',
        name: `Business Casual Dress allows Jeans`,
        price: 150,
        discount: 5,
        image: 'assets/img/categories/man/casual/casual08.jpg',
        colors: ['Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[7]]
      },
      {
        id: '0054',
        name: `Korean Suit Designer Blazers for Men`,
        price: 150,
        discount: 5,
        image: 'assets/img/categories/man/casual/casual05.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[7]]
      },
      // with Jeans 
      {
        id: '0055',
        name: `Tropical Deadpool Short Sleeve Shirt`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/jean/jean01.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[8]]
      },
      {
        id: '0056',
        name: `High Quality Mens Denim Jacket`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/jean/jean02.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[8]]
      },
      {
        id: '0057',
        name: `Cowboy blazer jeans jacket men`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/jean/jean03.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[8]]
      },
      {
        id: '0058',
        name: `Mens Raglan T-Shirts`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/jean/jean04.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[8]]
      },
      {
        id: '0059',
        name: `Casual Suit Jean Jacket Men Slim Fit`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/jean/jean05.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[8]]
      },
      {
        id: '0060',
        name: `Ellesse Luccios Track Top`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/jean/jean07.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[8]]
      },
      //  Summer Mens Skinny Jogging Bottoms Slim Fit  
      {
        id: '0061',
        name: `Black Polo Shirt For Men`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer01.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0062',
        name: `Black Poly-cotton polo shirt`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer02.jpg',
        colors: ['Brown', 'Black'],
        sizes: ['M', 'L', 'XL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0063',
        name: `Fred Perry Navy Shirt`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer03.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0064',
        name: `Lacoste's short sleeve polo`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer04.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0065',
        name: `Red Short-sleeved Lacoste Polo`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer05.jpg',
        colors: ['Pink', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0066',
        name: `Justin Bieber Extended T-shirt`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer06.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0067',
        name: `Elvis Jailhouse Rock T-Shirt`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer07.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      {
        id: '0068',
        name: `Grey and Demand Barrow Joggers`,
        price: 90,
        discount: 5,
        image: 'assets/img/categories/man/summer/summer08.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[9]]
      },
      // Cosplay
      {
        id: '0069',
        name: `Gothic Vampire Costume Halloween`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay01.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0070',
        name: `Mens Deluxe Vampire Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay02.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0071',
        name: `Super Deluxe Victorian Vampire Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay03.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0072',
        name: `Goth Vampire Outfit Halloween Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay04.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0073',
        name: `Vampire Costume Halloween Party Dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay05.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0074',
        name: `Vampire Count Draculas Mens Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay06.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0075',
        name: `Devil Costumes for Men`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay07.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      {
        id: '0076',
        name: `Costumes Count Bloodthirst Dracula`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/man/cosplay/cosplay08.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[10]]
      },
      // Kid 
      // Girls
      {
        id: '0077',
        name: `Milly Minis 'Chloe' Lace Shift Dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl01.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0078',
        name: `Kid t-shirt stripe dots grijs-bruin`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl02.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12]]
      },
      {
        id: '0079',
        name: `Kids Dresses Princess Jewel Neck`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl03.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0080',
        name: `Tween Punk 'N Pumpkin Girl Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl04.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[16]]
      },
      {
        id: '0081',
        name: `Girls Princess Dresses Blue`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl05.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0082',
        name: `Summer Short Sleeves Candy Printing Party Dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl06.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0083',
        name: `Summer new girls pants child`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl07.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[14]]
      },
      {
        id: '0084',
        name: `Orange frill dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl08.jpg',
        colors: ['Brown', 'Blue', 'Orange'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0085',
        name: `Ballet Dress For Children Girl`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl09.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[14]]
      },
      {
        id: '0086',
        name: `Girl Kids Witch Fancy Dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl10.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[16]]
      },
      {
        id: '0087',
        name: `Honey Bee Fancy Dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl11.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[16]]
      },
      {
        id: '0088',
        name: `Butterfly Princess Girl Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl12.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[16]]
      },
      {
        id: '0089',
        name: `Girls Skater Dress Kids Polka Dot Summer`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl13.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0090',
        name: `Cute Girl Baby Colorful Polka Dot`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl14.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0091',
        name: `Ballerina Butterfly Gold Toddler Halloween Costume`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl15.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[16]]
      },
      {
        id: '0092',
        name: `Kids Girls Harry Potter Witches Purple`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl16.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[16]]
      },
      {
        id: '0093',
        name: `Simple Casual Dresses For Kids`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl17.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0094',
        name: `Blue Cartoon Dress For Children`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl18.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0095',
        name: `Orange Cascade Ruffled Beaded Lace Pageant Party Girl Dress`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl19.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      {
        id: '0096',
        name: `Summer Fashion Girl Dress Dot`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/girl/girl20.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[12], this.categories[15]]
      },
      // boys
      {
        id: '0097',
        name: `Fassion Boy Sleeve Less T Shirt`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy01.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[13], this.categories[14]]
      },
      {
        id: '0098',
        name: `Boy's suit white suits black edge fashionable`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy02.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[13]]
      },
      {
        id: '0099',
        name: `Fashion Children Boys Cartoon Minion Summer`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy03.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[13], this.categories[14]]
      },
      {
        id: '0100',
        name: `Winter Jacket Boys Outerwear`,
        price: 85,
        discount: 5,
        image: 'assets/img/categories/kid/boy/boy04.jpg',
        colors: ['Brown', 'Blue', 'Black'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        descriptions: [`Big packet, hole pants.`, `Both sides single breasted design.`, `Adjustable straps, comfortable fabrics, slim.`],
        categories: [this.categories[13]]
      },
    ];
*/
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

    this.wishproducts = [
      {
        product: this.products[0],
        color: 'Green',
        size: 'M'
      },
      {
        product: this.products[1],
        color: 'Pink',
        size: 'L'
      },
      {
        product: this.products[2],
        color: 'Blue',
        size: 'S'
      },
    ]
  }

  allFilters(): any {
    return this.filterTypes;
  }

  allCategory(): Category[] {
    return this.categories;
  }

  allSavedAdddress(): Address[] {
    this.addresses = this.addresses.sort((a, b) => { return a.firstname.charCodeAt(0) - b.firstname.charCodeAt(0) });
    return this.addresses;
  }

  allWishList(): WishProduct[] {
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
  
  removeProductWish(prod: Product) {
    var pos = -1;
    for (var i = 0; i < this.wishproducts.length; i++) {
      if (this.wishproducts[i].product.id === prod.id) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.wishproducts.splice(pos, 1);
      prod.love = false;
    }
  }

  addWish(wish: WishProduct): void {
    this.wishproducts.push(wish);
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

  removeSavedAddress(addr: Address): void {
    var pos = -1;
    for (var i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] === addr) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.addresses.splice(pos, 1);
    }
  }

  addSavedAddress(addr: Address): void {
    this.addresses.push(addr);
    this.addresses = this.addresses.sort((a, b) => { return a.firstname.charCodeAt(0) - b.firstname.charCodeAt(0) });
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
}
