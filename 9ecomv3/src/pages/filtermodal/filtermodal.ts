import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Product} from '../../providers/product/product';

import { FiltersProvider , FilterTypes, Filter} from '../../providers/filters/filters';
/**
 * Generated class for the Filtermodal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-filtermodal',
  templateUrl: 'filtermodal.html',
})
export class FilterModalPage {
  products: Product[];
  filterTypes: Array<FilterTypes>;
  selectedFilter: FilterTypes;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private view: ViewController
    , public filterProv : FiltersProvider
  ) {
    this.products = new Array<Product>();
    this.products = navParams.get('products');
    console.log(this.products);
    this.filterTypes = new Array<FilterTypes>();
    this.filterProv.init();
    this.filterTypes = this.filterProv.filterTypes;
    this.selectedFilter = this.filterTypes[0];
    console.log(this.filterTypes);
    console.log(this.selectedFilter);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltermodalPage');
    this.filterTypes.forEach(item => {
      if (item.selected) {
        this.selectedFilter = item;
      }
    })
  }

  chooseTab(filterTitle) {
    this.filterTypes.forEach(item => {
      item.selected = false;
    });
    filterTitle.selected = true;
    this.selectedFilter = filterTitle;
  }

  selectFilters(selectedFilter, val) {

      selectedFilter.filter.forEach(f => {
        if (f !== val) {
          f.selected = false;
        }
      })
      val.selected = !val.selected;
  }

  clearAll() {
    this.filterTypes.forEach((fi: any) => {
      fi.filter.forEach((item: any) => {
        item.selected = false;
      });
    });
  }

  applyFilter() {
    //console.log('Apply Filter');
    let filterList = new Array<Filter>();

    let newProducts = new Array<Product>();
    this.filterTypes.forEach((fi: any) => {
      fi.filter.forEach((item: any) => {
        if (item.selected) {
          filterList.push(item);
        }
      });
    });
    console.log(filterList)
    if (filterList.length > 0) {
      filterList.forEach(item => {
        let prods = new Array<Product>();
        
        this.products.forEach(prod => {
          
            
              if (prod.price < item.val) {
                prods.push(prod);
              }
            
        });

        newProducts = prods;
      });
      
      this.products = newProducts;
      
    }

    this.dismiss();
  }

  dismiss() {
    var data = {
      products: this.products,
    }
    // Returning data from the modal:
    this.view.dismiss(
      data
    );
  }

  close() {
    this.navCtrl.pop();
  }
}
