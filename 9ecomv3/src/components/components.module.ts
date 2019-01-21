import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { SearchComponent } from './search/search';

import {AutoCompleteModule} from 'ionic2-auto-complete';
import { HeaderComponent } from './header/header';
import { RatingComponent } from './rating/rating';
@NgModule({
	declarations: [ProgressBarComponent,
    SearchComponent,
    HeaderComponent,
    RatingComponent],
	imports: [
		 IonicModule,
		AutoCompleteModule,
	],
	exports: [ProgressBarComponent,
    SearchComponent,
    HeaderComponent,
    RatingComponent]
})
export class ComponentsModule {}
