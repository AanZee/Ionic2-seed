import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

// Ionic native
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Camera } from '@ionic-native/camera';
import { MockCamera } from '../mocks/mock-camera';

// Translate
import { TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams } from 'ng2-translate';

// API providers
import { Oauth } from '../providers/utilities/api/oauth';
import { AuthToken } from '../providers/utilities/api/auth-token';
import { HttpErrorHandler } from '../providers/utilities/api/http-error-handler';
import { ApiGateway } from '../providers/utilities/api/api-gateway';
// Utility providers
import { Settings } from '../providers/utilities/app-settings';
import { Config } from '../providers/utilities/app-configuration';
import { Utilities } from '../providers/utilities/app-utilities';
import { StorageProvider } from '../providers/utilities/storage-provider';
import { CacheRequest } from '../providers/utilities/cache-request';

// Pipes

// Components
import { ComponentScrollShadow } from '../components/scroll-shadow/scroll-shadow';

export function httpErrorHandler(httpErrorHandler: HttpErrorHandler): any {
	return () => {};
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams): string {
		console.warn('Missing translation', params);
		return '...';
	}
}

@NgModule({
	declarations: [
		// Pipes

		// Components
		ComponentScrollShadow,
	],
	providers: [
		// Ionic native
		SplashScreen,
		StatusBar,
		Keyboard,
		Device,
		AppVersion,
		// Camera,
		{ provide: Camera, useClass: MockCamera },
		// API providers
		Oauth,
		AuthToken,
		HttpErrorHandler,
		ApiGateway,
		// Utility providers
		Settings,
		Config,
		Utilities,
		StorageProvider,
		CacheRequest,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{
			provide: APP_INITIALIZER,
			useFactory: httpErrorHandler, //this must be 'static' therefore definition below
			deps: [HttpErrorHandler],
			multi: true
		},
		{ provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
	],
	imports: [
		HttpModule,
		IonicStorageModule.forRoot(),
	],
	exports: [
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
