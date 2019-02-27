import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateListModalPage } from './cate-list-modal';

@NgModule({
  declarations: [
    CateListModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CateListModalPage),
  ],
})
export class CateListModalPageModule {}
