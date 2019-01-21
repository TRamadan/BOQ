import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ComponentsModule,
    TranslateModule,
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}
