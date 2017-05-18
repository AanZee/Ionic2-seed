/***************************
 * Requires:               *
 * - ./api-gateway.ts      *
 * - ./storage-provider.ts *
 ***************************/


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiGateway } from './api/api-gateway';
import { StorageProvider } from './storage-provider';

@Injectable()
export class CacheRequest {
	private storageKey: string = 'cacheData';
	private requests: any = {};
	private debug: boolean = false;

	constructor(
		private apiGateway: ApiGateway,
		private storageProvider: StorageProvider,
	) {}

	/**
	* Get appCache
	* @param  {string}       endpoint   Endpoint to make request to
	* @param  {string}       method     Request to make to server
	* @param  {boolean}      fresh      Wether to fetch fresh data from server or use cache
	* @param  {boolean}      hideLoader Wether to show a loading spinner while request is being made
	* @param  {number}       ttl        Lifetime of the cache (in seconds)
	* @return {Promise<any>}            [description]
	*/
	public fetch(endpoint: string, method: string, fresh?: boolean, hideLoader?: boolean, ttl?: number): Promise<any> {
		let key: string = method.split('&')[0];
		return new Promise((resolve: any, reject: any) => {
			if (fresh) {
				this.serverRequest(endpoint, method, hideLoader).subscribe((data: any) => {
					if (data) {
						if (this.debug) { console.log('from server:', method); }
						this.requests[key] = { data: data, lifetime: ttl * 1000, timestamp: Date.now() };
						this.save();
						resolve(this.requests[key].data);
					}
				});
			} else {
				if (this.requests[key]) {
					if (this.requests[key].ttl > Date.now() - this.requests[key].timestamp) {
						if (this.debug) { console.log('from cache:', method); }
						resolve(this.requests[key].data);
						return;
					} else {
						if (this.debug) { console.log('cache is pronounced dead:', method); }
					}
				}

				this.storageProvider.getItem(this.storageKey).then((storageData: any) => {
					if (storageData && storageData[key]) {
						if (this.debug) { console.log('from storage:', method); }
						this.requests = storageData || {};
						resolve(this.requests[key].data);
					} else {
						if (this.debug) { console.log('from server:', method); }
						this.serverRequest(endpoint, method, hideLoader).subscribe((data: any) => {
							if (data) {
								this.requests[key] = { data: data, lifetime: ttl * 1000, timestamp: Date.now() };
								this.save();
								resolve(this.requests[key].data);
							}
						});
					}
				});
			}
		});
	}

	/**
	 * Clear all cached requests
	 */
	public clear(): void {
		this.storageProvider.deleteItem(this.storageKey);
		this.requests = {};
	}

	/**
	 * Clear cache for provided request
	 * @param {string} method [description]
	 */
	public clearRequestCache(method: string): void {
		delete this.requests[method];
		this.save();
	}

	/**
	 * Make a request using apiGateway
	 * @param  {string}          endpoint   [description]
	 * @param  {string}          method     [description]
	 * @param  {boolean}         hideLoader [description]
	 * @return {Observable<any>}            [description]
	 */
	private serverRequest(endpoint: string, method: string, hideLoader?: boolean): Observable<any> {
		return this.apiGateway.get(
			endpoint + method, {}, hideLoader
		);
	}

	/**
	 * Save the cache
	 */
	private save(): void {
		this.storageProvider.setItem(this.storageKey, this.requests);
	}
}
