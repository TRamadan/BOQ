import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ByCategoryPipe, CategoriesPage } from './categories';
import { ScrollTabsComponentModule } from '../../components/scrolltabs';

@NgModule({
  declarations: [
    CategoriesPage,
    ByCategoryPipe,
  ],
  imports: [
    ScrollTabsComponentModule,
    IonicPageModule.forChild(CategoriesPage),
  ],
  exports: [
    CategoriesPage
  ]
})
export class CategoriesModule {}
