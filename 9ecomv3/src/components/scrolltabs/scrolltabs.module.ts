import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ScrollTabsComponent } from './scrolltabs';
import {TranslateModule} from '@ngx-translate/core';
@NgModule({
	imports: [
		TranslateModule,
		IonicModule
	],
	declarations: [
		ScrollTabsComponent
	],
	exports: [
		ScrollTabsComponent
	]
})
export class ScrollTabsComponentModule {}
