/***********************************************************************************************************
 * Requires:                                                                                               *
 * - `cordova-plugin-fcm` plugin                                                                           *
 * - Correct FCM files in 'src/assets/google-services.json' and 'src/assets/GoogleService-Info.plist'      *
 *     - ANDROID: All files are copied automagically with script below                                     *
 *     - IOS: After creating an ios build folder:                                                          *
 *         - copy 'platforms/ios/GoogleService-Info.plist' into the root of the Xcode project (drag/drop). *
 *         - enable push notification in Xcode project                                                     *
 * - Add to `config/copy.config.js`                                                                        *
 * ```                                                                                                     *
 *     //Copy Firebase config file build folder                                                            *
 *     let copyGoogleServicesAndroid = {                                                                   *
 *         src: ['{{ROOT}}/src/assets/google-services.json'],                                              *
 *         dest: '{{ROOT}}/platforms/android'                                                              *
 *     }                                                                                                   *
 *     orgCopyConfig.copyGoogleServicesAndroid = copyGoogleServicesAndroid;                                *
 *                                                                                                         *
 *     let copyGoogleServicesIos = {                                                                       *
 *         src: ['{{ROOT}}/src/assets/GoogleService-Info.plist'],                                          *
 *         dest: '{{ROOT}}/platforms/ios'                                                                  *
 *     }                                                                                                   *
 *     orgCopyConfig.copyGoogleServicesIos = copyGoogleServicesIos;                                        *
 *                                                                                                         *
 *     //Copy Firebase config file to root folder (circumvent an error)                                    *
 *     let copyGoogleServicesAndroidToRoot = {                                                             *
 *         src: ['{{ROOT}}/src/assets/google-services.json'],                                              *
 *         dest: '{{ROOT}}'                                                                                *
 *     }                                                                                                   *
 *     orgCopyConfig.copyGoogleServicesAndroidToRoot = copyGoogleServicesAndroidToRoot;                    *
 *                                                                                                         *
 *     let copyGoogleServicesIosToRoot = {                                                                 *
 *         src: ['{{ROOT}}/src/assets/GoogleService-Info.plist'],                                          *
 *         dest: '{{ROOT}}'                                                                                *
 *     }                                                                                                   *
 *     orgCopyConfig.copyGoogleServicesIosToRoot = copyGoogleServicesIosToRoot;                            *
 * ```                                                                                                     *
 ***********************************************************************************************************/


import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

declare let FCMPlugin: any;

@Injectable()
export class PushNotificationProvider {
	private isReady: boolean = false;
	private readyResolve: any;
	private notificationObservable: Observable<any>;
	private observer: any;

	public defaultTopic: string = 'messages';

	constructor(
		private platform: Platform,
	) {
		this.notificationObservable = Observable.create((subscriber: any) => {
			this.observer = subscriber;
		});

		this.platform.ready().then(() => {
			if (typeof (FCMPlugin) !== 'undefined') {
				this.isReady = true;
				if (this.readyResolve) {
					this.readyResolve();
				}

				FCMPlugin.onNotification((data: any) => {
					this.onNotificationReceived(data);
				}, (msg: any) => {
					console.log('onNotification callback successfully registered:', msg);
				}, (err: any) => {
					console.log('Error registering onNotification callback:', err);
				});
			} else {
				console.log('Push-notifications disabled, only provided in Android/iOS environments');
			}
		});
	}

	/**
	 * Init the provider
	 * @return {Promise<any>} [description]
	 */
	public init(): Promise<any> {
		return new Promise((resolve: any, reject: any) => {
			if (!this.isReady) {
				this.readyResolve = resolve;
			} else {
				resolve();
			}
		});
	}

	/**
	 * Returns observable that is fired on every notification received
	 * @return {Observable<any>} [description]
	 */
	public onNotification(): Observable<any> {
		return this.notificationObservable;
	}

	/**
	 * Notification callback method
	 * @param {any} data [description]
	 */
	private onNotificationReceived(data: any): void {
		console.log('Received notification', data);
		let object: any = {};
		if (this.platform.is('ios')) {
			let customSettings: any = {};
			for (let key in data) {
				if (['wasTapped', 'from', 'collapse_key', 'notification'].indexOf(key) === -1) {
					customSettings[key] = data[key];
				}
			}
			customSettings.dateReceived = Date.now();
			object = {
				title: data.aps.alert.title,
				content: data.aps.alert.body,
				fromBackground: data.wasTapped,
				customSettings: customSettings,
				originalObject: data
			};
		} else if (this.platform.is('android')) {
			let customSettings: any = {};
			for (let key in data) {
				if (['wasTapped'].indexOf(key) === -1) {
					customSettings[key] = data[key];
				}
			}
			customSettings.dateReceived = Date.now();
			object = {
				title: '',
				content: '',
				fromBackground: data.wasTapped,
				customSettings: customSettings,
				originalObject: data
			};
		}
		this.observer.next(object);
	}

	/**
	 * Retrieves the FCM token
	 * @return {Promise<string>} [description]
	 */
	public getToken(): Promise<string> {
		return new Promise((resolve: any, reject: any) => {
			if (this.isReady) {
				FCMPlugin.getToken((token: string) => {
					// Use this token for sending device specific messages
					resolve(token);
				}, (err: any) => {
					console.log('error getting token', err);
					reject();
				});
			} else {
				console.log('notification plugin not ready');
				reject();
			}
		});
	}

	/**
	 * Subscribes FCM to a topic
	 * @param {string} topic [description]
	 */
	public subscribeToTopic(topic: string): void {
		if (this.isReady) {
			FCMPlugin.subscribeToTopic(topic);
		}
	}

	/**
	 * Unsubscribes FCM from a topic
	 * @param {string} topic [description]
	 */
	public unsubscribeFromTopic(topic: string): void {
		if (this.isReady) {
			FCMPlugin.unsubscribeFromTopic(topic);
		}
	}
}
