// /**********************************************
//  * Requires:                                  *
//  * - '@ionic-native/google-analytics' module  *
//  * - `cordova-plugin-google-analytics` plugin *
//  **********************************************/
//
//
// import { Injectable } from '@angular/core';
// import { GoogleAnalytics } from '@ionic-native/google-analytics';
//
// import { SETTINGS } from './app-settings';
//
// @Injectable()
// export class GAProvider {
// 	private isReady: boolean = false;
// 	private queue: string[] = [];
//
// 	/**
// 	 * Initiate tracker. Work queue when ready
// 	 */
// 	constructor(
// 		private googleAnalytics: GoogleAnalytics,
// 	) {
// 		if (!SETTINGS.GA_ID) {
// 			console.warn('GA_ID not set in settings file');
// 		} else {
// 			this.googleAnalytics.startTrackerWithId(SETTINGS.GA_ID).then(() => {
// 				console.log('GA ready');
// 				this.isReady = true;
// 				while (this.queue.length) {
// 					this.googleAnalytics.trackView(this.queue.shift());
// 				}
// 			}).catch((error) => {
// 				console.log('Error starting GA', error);
// 			});
// 		}
// 	}
//
// 	/**
// 	 * Track a view with a name. Add to a queue if tracker has not started yet
// 	 * @param {string} key [description]
// 	 */
// 	public trackView(key: string): void {
// 		if (this.isReady) {
// 			this.googleAnalytics.trackView(key);
// 		} else {
// 			this.queue.push(key);
// 		}
// 	}
// }
