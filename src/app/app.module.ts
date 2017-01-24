import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateStaticLoader, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from 'ng2-translate';

import { MyApp } from './app.component';

// API providers
import { Oauth } from '../providers/utilities/api/oauth';
import { AuthToken } from '../providers/utilities/api/auth-token';
import { HttpErrorHandler } from '../providers/utilities/api/http-error-handler';
import { ApiGateway } from '../providers/utilities/api/api-gateway';
// Utility providers
import { StorageProvider } from '../providers/utilities/storage-provider';
import { CacheRequest } from '../providers/utilities/cache-request';
import { GAProvider } from '../providers/utilities/ga-provider';
import { WebPopup } from '../providers/utilities/web-popup';
import { PushNotificationProvider } from '../providers/utilities/push-notification-provider';
// App providers
// import { ExampleProvider } from '../providers/example-provider';

// Pipes

// Components
import { ScrollShadow } from '../components/scroll-shadow/scroll-shadow';

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

@NgModule({
    declarations: [
        MyApp,

        // Pipes

        // Components
        ScrollShadow,

        // Pages
        HomePage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            // backButtonText: ''
        }),
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
        // API providers
        Oauth,
        AuthToken,
        HttpErrorHandler,
        ApiGateway,
        // Utility providers
        StorageProvider,
        CacheRequest,
		GAProvider,
        WebPopup,
        PushNotificationProvider,
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
export class AppModule { }
