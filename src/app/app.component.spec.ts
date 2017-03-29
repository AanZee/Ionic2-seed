import { async, TestBed } from '@angular/core/testing';

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
import { StorageProvider } from '../providers/utilities/storage-provider';
import { CacheRequest } from '../providers/utilities/cache-request';
// App providers
// import { ExampleProvider } from '../providers/example-provider';

// Pipes

// Components
import { ComponentScrollShadow } from '../components/scroll-shadow/scroll-shadow';

// Pages
import { HomePage } from '../pages/home/home';

export function httpErrorHandler(httpErrorHandler: HttpErrorHandler) {
	return () => {}
}

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams) {
		console.warn('Missing translation', params);
		return '...';
	}
}

describe('MyApp Component', () => {
	let fixture: any;
	let component: any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				MyApp,

				// Pipes

				// Components
				ComponentScrollShadow,

				// Pages
				HomePage
			],
			imports: [
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
			providers: [
				// Ionic native
				SplashScreen,
				StatusBar,
				Keyboard,
				Device,
				AppVersion,
				{ provide: Camera, useClass: MockCamera },
				// API providers
				Oauth,
				AuthToken,
				HttpErrorHandler,
				ApiGateway,
				// Utility providers
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
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyApp);
		component = fixture.componentInstance;
	});

	it('should be created', () => {
		expect(component instanceof MyApp).toBe(true);
	});

	it('should have rootPage', () => {
		expect(component.rootPage).toBeDefined();
	});
});