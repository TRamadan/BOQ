import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { ScrollTabsComponentModule } from '../../components/scrolltabs';

@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    ScrollTabsComponentModule,
    IonicPageModule.forChild(CheckoutPage),
  ],
  exports: [
    CheckoutPage
  ]
})
export class CheckoutModule {}
