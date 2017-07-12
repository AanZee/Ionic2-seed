/*****************************
 * Requires:                 *
 * - `@ionic/storage` module *
 *****************************/


import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
	private userId: any;
	private userIdKey: string = 'auth-token';

	constructor(
		private events: Events,
		private storage: Storage,
	) {
		this.userId = this.getUserId();

		this.events.subscribe('user+logout', () => {
			this.userId = null;
		});
	}

	/**
	 * Get a user-unique key for storage
	 * @return string - User-unique key
	 */
	public getUserId(): string {
		return (localStorage.getItem(this.userIdKey) || '00000').substr(0, 5);
	}

	/**
	* Invalidate Cache
	* @returns {Promise<any>}
	*/
	public cacheInvalidate(): Promise<any> {
		return this.storage.clear();
	}

	/**
	* Get Cached Item
	* @param {string} name - Key name of item from store
	* @returns {Promise<any>}
	*/
	public getItem(name: string): Promise<any> {
		if (!this.userId) {
			this.userId = this.getUserId();
		}

		return new Promise((resolve: any, reject: any) => {
			this.storage.get(name + '_' + this.userId).then((cachedResult: string) => {
				if (cachedResult) {
					let data: any = JSON.parse(cachedResult);
					resolve(data.data);
				} else {
					resolve(undefined);
				}
			}).catch((err: any) => reject(err));
		});
	}

	/**
	* Set Cached Item
	* @param {string} name - Key name of item to store
	* @param {any} data - Value of data to store
	* @returns {Promise<any>}
	*/
	public setItem(name: string, data: any): Promise<any> {
		if (!this.userId) {
			this.userId = this.getUserId();
		}

		let value: string = JSON.stringify({ data: data });
		return this.storage.set(name + '_' + this.userId, value);
	}

	/**
	* Delete Cached Item
	* @param {string} name - Key name of item to delete
	* @returns {Promise<any>}
	*/
	public deleteItem(name: string): Promise<any> {
		if (!this.userId) {
			this.userId = this.getUserId();
		}

		return this.storage.remove(name + '_' + this.userId);
	}
}
