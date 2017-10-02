import {
	NgModule,
	APP_INITIALIZER,
} from '@angular/core';
import {
	BrowserModule,
} from '@angular/platform-browser';
import {
	IonicApp,
	IonicModule,
} from 'ionic-angular';
import {
	HttpModule,
} from '@angular/http';
import {
	HttpClientModule,
	HttpClient,
} from '@angular/common/http';

import {
	MyApp,
} from './app.component';
import {
	SharedModule,
} from './shared.module';
import {
	ProvidersModule,
} from '../providers/providers.module';

// Http error handler
import { HttpErrorHandler } from '../providers/utilities/api/http-error-handler';

export function createHttpErrorHandler(httpErrorHandler: HttpErrorHandler): any {
	return () => {};
}

// Translate
import { TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(httpClient: HttpClient): any {
	return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams): string {
		console.warn('Missing translation', params.key);
		return '...';
	}
}

@NgModule({
	declarations: [
		MyApp,
	],
	imports: [
		HttpModule,
		HttpClientModule,
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			// mode: 'ios',
			// backButtonText: '',
		}),
		SharedModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient],
			},
			missingTranslationHandler: {
				provide: MissingTranslationHandler,
				useClass: MyMissingTranslationHandler,
			},
		}),
		ProvidersModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		HttpErrorHandler,
		{
			provide: APP_INITIALIZER,
			useFactory: createHttpErrorHandler,
			deps: [HttpErrorHandler],
			multi: true,
		},
	],
	exports: [
		ProvidersModule,
		TranslateModule,
	],
})
export class AppModule {}
