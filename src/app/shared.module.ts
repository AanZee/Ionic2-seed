import { NgModule, ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

// Ionic native
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

// Translate
import { TranslateModule } from '@ngx-translate/core';

// Modules
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
	declarations: [],
	providers: [
		// Ionic native
		SplashScreen,
		StatusBar,
		Keyboard,
		Device,
		AppVersion,

		{ provide: ErrorHandler, useClass: IonicErrorHandler },
	],
	imports: [
		PipesModule,
		ComponentsModule,

		HttpModule,
		IonicStorageModule.forRoot(),
	],
	exports: [
		PipesModule,
		ComponentsModule,

		TranslateModule,
	]
})
export class SharedModule {

	static forRoot(): any {
		return {
			ngModule: SharedModule
		};
	}
}
