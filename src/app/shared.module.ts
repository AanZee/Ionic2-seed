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
import { TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams } from 'ng2-translate';

// Modules
import { ProvidersModule } from '../providers/providers.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams): string {
		console.warn('Missing translation', params);
		return '...';
	}
}

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
		{ provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
	],
	imports: [
		PipesModule,
		ComponentsModule,
		ProvidersModule,

		HttpModule,
		IonicStorageModule.forRoot(),
	],
	exports: [
		ProvidersModule,
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
