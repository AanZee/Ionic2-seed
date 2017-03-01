/**********************************************
 * Requires:                                  *
 * - `cordova-plugin-google-analytics` plugin *
 **********************************************/


import { Injectable } from '@angular/core';
import { GoogleAnalytics } from 'ionic-native';

@Injectable()
export class GAProvider {
	private static isReady: boolean = false;
	private static queue: string[] = [];

	constructor() {}

	/**
	 * Initiate tracker. Work queue when ready
	 * @param  {string} id [description]
	 * @return {[type]}    [description]
	 */
	public static startTrackerWithId(id: string) {
		GoogleAnalytics.startTrackerWithId(id).then(() => {
			console.log('GA ready');
			GAProvider.isReady = true;
			while(GAProvider.queue.length) {
				GAProvider.trackView(GAProvider.queue.shift());
			}
		}).catch((error) => {
			console.log('Error starting GA', error);
		});
	}

	/**
	 * Track a view with a name. Add to a queue if tracker has not started yet
	 * @param {string} key [description]
	 */
	public static trackView(key: string): void {
		if (GAProvider.isReady) {
			GoogleAnalytics.trackView(key);
		} else {
			GAProvider.queue.push(key);
		}
	}
}
