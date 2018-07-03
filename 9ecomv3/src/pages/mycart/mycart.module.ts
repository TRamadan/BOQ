import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCartPage } from './mycart';

@NgModule({
  declarations: [
    MyCartPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCartPage),
  ],
  exports: [
    MyCartPage
  ]
})
export class MyCartModule {}
