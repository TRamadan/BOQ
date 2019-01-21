import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ProductPage),
  ],
  exports: [
    ProductPage
  ]
})
export class ProductModule {}
