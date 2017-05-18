import { NgModule } from '@angular/core';

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

export function httpErrorHandler(httpErrorHandler: HttpErrorHandler): any {
	return (): any => {};
}

@NgModule({
	providers: [
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
	]
})
export class ProvidersModule {}
