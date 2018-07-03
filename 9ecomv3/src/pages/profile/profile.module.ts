import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ScrollTabsComponentModule } from '../../components/scrolltabs';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    ScrollTabsComponentModule,
    IonicPageModule.forChild(ProfilePage),
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
