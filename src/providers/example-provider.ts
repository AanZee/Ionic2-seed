import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiGateway } from './utilities/api/api-gateway';
import { CacheRequest } from './utilities/cache-request';
import { Settings } from './utilities/app-settings';

@Injectable()
export class ExampleProvider {

	constructor(
		public apiGateway: ApiGateway,
		public cacheRequest: CacheRequest,
	) {}

	// Direct API calls
	public getData(hideLoader?: boolean): Observable<any> {
		let method = 'data.get';
		return this.apiGateway.get(
			Settings.apiEndpoint + method, {}, !!hideLoader
		);
	}
	public postData(post_data: any, hideLoader?: boolean): Observable<any> {
		let method = 'data.post';
		return this.apiGateway.post(
			Settings.apiEndpoint + method, {}, post_data, !!hideLoader
		);
	}

	// Cache API calls
	public fetch(): Promise<any> {
		return new Promise((resolve: any, reject: any) => {
			let method = 'data.get';
			this.cacheRequest.fetch(Settings.apiEndpoint, method, false).then((data: any) => {
				if (data) {
					resolve(data);
				} else {
					reject();
				}
			});
		});
	}
}
