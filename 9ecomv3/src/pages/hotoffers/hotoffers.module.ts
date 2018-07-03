import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotoffersPage } from './hotoffers';

@NgModule({
  declarations: [
    HotoffersPage,
  ],
  imports: [
    IonicPageModule.forChild(HotoffersPage),
  ],
  exports: [
    HotoffersPage
  ]
})
export class HotoffersModule {}
