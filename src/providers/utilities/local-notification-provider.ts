// /************************************************************
//  * Requires:                                                *
//  * - '@ionic-native/local-notifications' module             *
//  * - `de.appplant.cordova.plugin.local-notification` plugin *
//  ************************************************************/
//
//
// import { Injectable } from '@angular/core';
// import { LocalNotifications } from '@ionic-native/local-notifications';
// import { Platform } from 'ionic-angular';
// import { Observable } from 'rxjs/Rx';
//
// @Injectable()
// export class LocalNotificationProvider {
// 	private notificationObservable: Observable<any>;
// 	private observer: any;
//
// 	constructor(
// 		private localNotifications: LocalNotifications,
// 		private platform: Platform,
// 	) {
// 		this.notificationObservable = Observable.create((subscriber) => {
// 			this.observer = subscriber;
// 		});
//
// 		this.localNotifications.on('trigger', (notification) => {
// 			let data: any = JSON.parse(notification.data);
// 			this.onNotificationReceived(data);
// 			if (data.runOneTime) {
// 				setTimeout(() => {
// 					this.localNotifications.clear(notification.id);
// 					this.localNotifications.cancel(notification.id);
// 				}, 1000);
// 			}
// 		});
// 	}
//
// 	/**
// 	 * Schedule a local notification
// 	 * @param  {[type]} options [description]
// 	 * @return {[type]}         [description]
// 	 */
// 	public static schedule(options: any) {
// 		this.localNotifications.schedule(options);
// 	}
//
// 	/**
// 	 * Returns observable that is fired on every notification received
// 	 * @return {Observable<any>} [description]
// 	 */
// 	public onNotification(): Observable<any> {
// 		return this.notificationObservable;
// 	}
//
// 	/**
// 	 * Notification callback method
// 	 * @param {any} data [description]
// 	 */
// 	private onNotificationReceived(data: any): void {
// 		console.log('Received notification', data);
// 		let object: any = {};
// 		if (this.platform.is('ios')) {
// 			let customSettings: any = {};
// 			for(let key in data) {
// 				if (['wasTapped', 'from', 'collapse_key', 'notification'].indexOf(key) == -1) {
// 					customSettings[key] = data[key];
// 				}
// 			}
// 			customSettings.dateReceived = Date.now();
// 			object = {
// 				title: data.notification.title,
// 				content: data.notification.body,
// 				fromBackground: data.wasTapped,
// 				customSettings: customSettings,
// 				originalObject: data
// 			}
// 		} else if (this.platform.is('android')) {
// 			let customSettings: any = {};
// 			for(let key in data) {
// 				if (['wasTapped'].indexOf(key) == -1) {
// 					customSettings[key] = data[key];
// 				}
// 			}
// 			customSettings.dateReceived = Date.now();
// 			object = {
// 				title: '',
// 				content: '',
// 				fromBackground: data.wasTapped,
// 				customSettings: customSettings,
// 				originalObject: data
// 			}
// 		}
// 		this.observer.next(object);
// 	}
// }
