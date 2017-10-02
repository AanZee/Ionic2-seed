import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ComponentButtonToolbar } from './button-toolbar/button-toolbar';
import { ComponentFormControlMessage } from './form-control-message/form-control-message';
import { ComponentHorizontalOverflowContainer } from './horizontal-overflow-container/horizontal-overflow-container';
import { ComponentLogoHeader } from './logo-header/logo-header';
import { ComponentNumberInput } from './number-input/number-input';
import { ComponentPasswordViewer } from './password-viewer/password-viewer';
import { ComponentScrollShadow } from './scroll-shadow/scroll-shadow';
import { ComponentSelectSwitch } from './select-switch/select-switch';

@NgModule({
	declarations: [
		ComponentButtonToolbar,
		ComponentFormControlMessage,
		ComponentHorizontalOverflowContainer,
		ComponentLogoHeader,
		ComponentNumberInput,
		ComponentPasswordViewer,
		ComponentScrollShadow,
		ComponentSelectSwitch,
	],
	imports: [
		IonicModule,
	],
	exports: [
		ComponentButtonToolbar,
		ComponentFormControlMessage,
		ComponentHorizontalOverflowContainer,
		ComponentLogoHeader,
		ComponentNumberInput,
		ComponentPasswordViewer,
		ComponentScrollShadow,
		ComponentSelectSwitch,
	],
})
export class ComponentsModule {}
