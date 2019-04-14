import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorPage } from './vendor';
import {ComponentsModule } from '../../components/components.module';
import { TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    VendorPage,
  ],
  imports: [
    TranslateModule,
    ComponentsModule,
    IonicPageModule.forChild(VendorPage),
  ],
})
export class VendorPageModule {}
