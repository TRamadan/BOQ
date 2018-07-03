import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThankPage } from './thank';

@NgModule({
  declarations: [
    ThankPage,
  ],
  imports: [
    IonicPageModule.forChild(ThankPage),
  ],
  exports: [
    ThankPage
  ]
})
export class ThankModule {}
