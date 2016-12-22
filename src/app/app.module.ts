import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// API providers
import { Oauth } from '../providers/utilities/api/oauth';
import { AuthToken } from '../providers/utilities/api/auth-token';
import { HttpErrorHandler } from '../providers/utilities/api/http-error-handler';
import { ApiGateway } from '../providers/utilities/api/api-gateway';
// Utility providers
import { StorageProvider } from '../providers/utilities/storage-provider';
import { CacheRequest } from '../providers/utilities/cache-request';
import { WebPopup } from '../providers/utilities/web-popup';
// App providers
// import { ExampleProvider } from '../providers/example-provider';

// Pipes

// Components

// Pages
import { HomePage } from '../pages/home/home';

export function httpErrorHandler(httpErrorHandler: HttpErrorHandler) {
    return () => {}
}

@NgModule({
    declarations: [
        MyApp,

        // Pipes

        // Components

        // Pages
        HomePage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            // backButtonText: ''
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
        WebPopup,
        // App providers
        // ExampleProvider,

        { provide: ErrorHandler, useClass: IonicErrorHandler },
        {
            provide: APP_INITIALIZER,
            useFactory: httpErrorHandler, //this must be 'static' therefore definition below
            deps: [HttpErrorHandler],
            multi: true
        }
    ]
})
export class AppModule { }
