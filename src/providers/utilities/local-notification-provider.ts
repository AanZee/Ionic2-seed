/***********************************************************************************
 * Requires:                                                                       *
 * - '@ionic-native/local-notifications' module                                    *
 * - `https://github.com/EddyVerbruggen/cordova-plugin-local-notifications` plugin *
 **********************************************************************************/


import { Injectable } from '@angular/core';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Rx';

export interface ILocalNotificationCopy extends ILocalNotification {}

@Injectable()
export class LocalNotificationProvider extends LocalNotifications {
	private notificationObservable: Observable<any>;
	private observer: any;

	constructor() {
		super();
		this.notificationObservable = Observable.create((subscriber: any) => {
			this.observer = subscriber;

			super.on('trigger', (notification: any) => {
				this.onNotificationReceived(notification);
			});
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
	 * @param {any} notification [description]
	 */
	private onNotificationReceived(notification: any): void {
		// Parse JSON stringified data
		if (notification.data) {
			notification.data = JSON.parse(notification.data);
		}
		this.observer.next(notification);
	}
}
