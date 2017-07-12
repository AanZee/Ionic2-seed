import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';

import { MyApp } from './app.component';
import { SharedModule } from './shared.module';
import { ProvidersModule } from '../providers/providers.module';

// Translate
import { TranslateModule, TranslateStaticLoader, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from 'ng2-translate';

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
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			// backButtonText: ''
		}),
		SharedModule.forRoot(),
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}),
		ProvidersModule,
	],
	exports: [
		ProvidersModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: []
})
export class AppModule {}
