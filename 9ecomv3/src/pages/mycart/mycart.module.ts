import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCartPage } from './mycart';
import { TranslateModule} from '@ngx-translate/core';
@NgModule({
  declarations: [
    MyCartPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(MyCartPage),
  ],
  exports: [
    MyCartPage
  ]
})
export class MyCartModule {}
