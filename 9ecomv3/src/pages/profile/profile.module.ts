import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ScrollTabsComponentModule } from '../../components/scrolltabs';
import {TranslateModule } from '@ngx-translate/core';
import { ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    ComponentsModule,
    ScrollTabsComponentModule,
    TranslateModule,
    IonicPageModule.forChild(ProfilePage),
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
