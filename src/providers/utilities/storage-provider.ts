/*****************************
 * Requires:                 *
 * - `@ionic/storage` module *
 *****************************/


import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
	private user_id: any;

	constructor(
		private events: Events,
		private storage: Storage,
	) {
		this.user_id = localStorage.getItem('user_id');

		this.events.subscribe('user+logout', () => {
			this.user_id = null;
		});
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
	* @param {string} name - Cache key
	* @param {string} location - API endpoint of cached item
	* @param {number=} ttl - TTL in seconds (-1 to invalidate immediately)
	* @returns {Promise<{}>}
	*/
	public getItem(name: string): Promise<any> {
		if (!this.user_id) {
			this.user_id = localStorage.getItem('user_id');
		}

		return new Promise((resolve, reject) => {
			this.storage.get(name + '_' + this.user_id).then(cachedResult => {
				if (cachedResult) {
					let data = JSON.parse(cachedResult);
					resolve(data.data);
				} else {
					resolve(undefined);
				}

			}).catch(err => reject(err));
		});
	}

	/**
	* Set Cached Item
	* @param {string} name - Key name of item to store
	* @param {any} data - Value of data to store
	* @param {ttl=} ttl - TTL in seconds
	*/
	public setItem(name: string, data: any): Promise<{}> {
		if (!this.user_id) {
			this.user_id = localStorage.getItem('user_id');
		}

		let value = JSON.stringify({ data: data });
		return this.storage.set(name + '_' + this.user_id, value);
	}

	/**
	* Delete Cached Item
	* @param {string} name - Key name of item to delete
	* @returns {Promise<any>}
	*/
	public deleteItem(name: string): Promise<any> {
		if (!this.user_id) {
			this.user_id = localStorage.getItem('user_id');
		}

		return this.storage.remove(name + '_' + this.user_id);
	}
}
