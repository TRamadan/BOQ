import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubCateListPage } from './sub-cate-list';

@NgModule({
  declarations: [
    SubCateListPage,
  ],
  imports: [
    IonicPageModule.forChild(SubCateListPage),
  ],
  exports: [
    SubCateListPage
  ]
})
export class SubCateListPageModule {}
