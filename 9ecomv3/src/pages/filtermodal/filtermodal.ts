import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Product, Database } from '../../providers/database';
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
  filterTypes: any;
  selectedFilter: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.products = new Array<Product>();
    this.filterTypes = new Array<any>();
    var db = Database.getInstance();
    this.products = db.allProduct();
    this.filterTypes = db.allFilters();
    this.selectedFilter = this.filterTypes[0];
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
    if (selectedFilter.type === 'or') {
      selectedFilter.filters.forEach(f => {
        if (f !== val) {
          f.checked = false;
        }
      })
      val.checked = !val.checked;
    } else {
      val.checked = !val.checked;
    }
  }

  clearAll() {
    this.filterTypes.forEach((fi: any) => {
      fi.filters.forEach((item: any) => {
        item.checked = false;
      });
    });
  }

  applyFilter() {
    console.log('Apply Filter');
    let filterList = new Array<any>();

    let newProducts = new Array<Product>();
    this.filterTypes.forEach((fi: any) => {
      fi.filters.forEach((item: any) => {
        if (item.checked) {
          filterList.push(item);
        }
      });
    });

    if (filterList.length > 0) {
      filterList.forEach(item => {
        let prods = new Array<Product>();

        this.products.forEach(prod => {
          if (item.compare === 'range') {
            if (prod[item.attr]) {
              if (prod[item.attr] > item.min && prod[item.attr] < item.max) {
                prods.push(prod);
              }
            }
          } else if (item.compare === 'equal') {
            if (prod[item.attr]) {
              if (prod[item.attr].indexOf(item.value) >= 0) {
                prods.push(prod);
              }
            }
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
