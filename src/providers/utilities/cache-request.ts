import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { ApiGateway } from "./api/api-gateway";
import { StorageProvider } from './storage-provider';

@Injectable()
export class CacheRequest {
    storageKey: string = this.storageKey;
    requests: any = {};

    constructor(
        public apiGateway: ApiGateway,
        public storageProvider: StorageProvider
    ) {
    }

    /**
     * Get appCache
     * @param {string} endpoint - Endpoint to make request to
     * @param {string} method - Request to make to server
     * @param {boolean=} fresh - Wether to fetch fresh data from server or use cache
     * @returns {Promise<any>}
     */
    fetch(endpoint: string, method: string, fresh?: boolean, hideLoader?: boolean): Promise<any> {
        let key = method.split('&')[0];
        return new Promise((resolve: any, reject: any) => {
            if (fresh) {
                this.serverRequest(endpoint, method, hideLoader).subscribe((data: any) => {
                    if (data) {
                        console.log('from server');
                        this.requests[key] = data;
                        this.storageProvider.setItem(this.storageKey, this.requests);
                        resolve(this.requests[key]);
                    }
                });
            } else {
                if (this.requests[key]) {
                    console.log('from cache');
                    resolve(this.requests[key]);
                } else {
                    this.storageProvider.getItem(this.storageKey).then((storageData: any) => {
                        if (storageData && storageData[key]) {
                            console.log('from storage');
                            this.requests = storageData || {};
                            resolve(this.requests[key]);
                        } else {
                            console.log('from server');
                            this.serverRequest(endpoint, method, hideLoader).subscribe((data: any) => {
                                if (data) {
                                    this.requests[key] = data;
                                    this.storageProvider.setItem(this.storageKey, this.requests);
                                    resolve(this.requests[key]);
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    clear(): void {
        this.storageProvider.deleteItem(this.storageKey);
        this.requests = {};
    }

    private serverRequest(endpoint: string, method: string, hideLoader?: boolean): Observable<any> {
        return this.apiGateway.get(
            endpoint + method, {}, hideLoader
        );
    }
}
