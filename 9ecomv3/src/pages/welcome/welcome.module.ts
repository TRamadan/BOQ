import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(WelcomePage),
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomeModule {}
