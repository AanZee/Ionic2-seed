import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ComponentScrollShadow } from './scroll-shadow/scroll-shadow';
import { ComponentSelectSwitch } from './select-switch/select-switch';

@NgModule({
	declarations: [
		ComponentScrollShadow,
		ComponentSelectSwitch,
	],
	imports: [
		IonicModule
	],
	exports: [
		ComponentScrollShadow,
		ComponentSelectSwitch,
	]
})
export class ComponentsModule {}
