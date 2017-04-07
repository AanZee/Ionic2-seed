import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule, Http } from '@angular/http';

// Ionic native
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Camera } from '@ionic-native/camera';
import { MockCamera } from '../mocks/mock-camera';

// Translate
import { TranslateModule, TranslateStaticLoader, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from 'ng2-translate';

// App
import { MyApp } from './app.component';

// API providers
import { Oauth } from '../providers/utilities/api/oauth';
import { AuthToken } from '../providers/utilities/api/auth-token';
import { HttpErrorHandler } from '../providers/utilities/api/http-error-handler';
import { ApiGateway } from '../providers/utilities/api/api-gateway';
// Utility providers
import { Settings } from '../providers/utilities/app-settings';
import { StorageProvider } from '../providers/utilities/storage-provider';
import { CacheRequest } from '../providers/utilities/cache-request';
// App providers
// import { ExampleProvider } from '../providers/example-provider';

// Pipes

// Components
import { ComponentScrollShadow } from '../components/scroll-shadow/scroll-shadow';

// Pages
import { HomePage } from '../pages/home/home';

export function httpErrorHandler(httpErrorHandler: HttpErrorHandler): any {
	return () => {};
}

export function createTranslateLoader(http: Http): TranslateStaticLoader {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams): string {
		console.warn('Missing translation', params);
		return '...';
	}
}

@NgModule({
	declarations: [
		MyApp,

		// Pipes

		// Components
		ComponentScrollShadow,

		// Pages
		HomePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			// backButtonText: ''
		}),
		IonicStorageModule.forRoot(),
		HttpModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,

		// Pages
		HomePage
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
		StorageProvider,
		CacheRequest,
		// App providers
		// ExampleProvider,

		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
		{
			provide: APP_INITIALIZER,
			useFactory: httpErrorHandler, //this must be 'static' therefore definition below
			deps: [HttpErrorHandler],
			multi: true
		}
	]
})
export class AppModule {}
