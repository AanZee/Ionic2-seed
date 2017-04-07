import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { About } from './about';
import { SharedModule } from '../../app/shared.module';

@NgModule({
	declarations: [
		About,
	],
	imports: [
		IonicPageModule.forChild(About),
		SharedModule,
	],
	exports: [
		About,
	]
})
export class AboutModule {}
