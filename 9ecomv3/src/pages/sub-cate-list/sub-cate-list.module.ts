import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubCateListPage } from './sub-cate-list';
import { ComponentsModule} from '../../components/components.module';
@NgModule({
  declarations: [
    SubCateListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SubCateListPage),
  ],
  exports: [
    SubCateListPage
  ]
})
export class SubCateListPageModule {}
