import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorPage } from './vendor';
import {ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    VendorPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(VendorPage),
  ],
})
export class VendorPageModule {}
