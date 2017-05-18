import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiGateway } from './utilities/api/api-gateway';
import { CacheRequest } from './utilities/cache-request';
import { Settings } from './utilities/app-settings';

@Injectable()
export class ExampleProvider {

	constructor(
		public settings: Settings,
		public apiGateway: ApiGateway,
		public cacheRequest: CacheRequest,
	) {}

	// Direct API calls
	public getData(hideLoader?: boolean): Observable<any> {
		let method: string = 'data.get';
		return this.apiGateway.get(
			this.settings.apiEndpoint + method, {}, !!hideLoader
		);
	}
	public postData(post_data: any, hideLoader?: boolean): Observable<any> {
		let method: string = 'data.post';
		return this.apiGateway.post(
			this.settings.apiEndpoint + method, {}, post_data, !!hideLoader
		);
	}

	// Cache API calls
	public fetch(): Promise<any> {
		return new Promise((resolve: any, reject: any): any => {
			let method: string = 'data.get';
			this.cacheRequest.fetch(this.settings.apiEndpoint, method, false).then((data: any) => {
				if (data) {
					resolve(data);
				} else {
					reject();
				}
			});
		});
	}
}
