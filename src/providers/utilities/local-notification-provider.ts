/************************************************************
 * Requires:                                                *
 * - `de.appplant.cordova.plugin.local-notification` plugin *
 ************************************************************/


import { Injectable } from '@angular/core';
import { LocalNotifications } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Observable } from "rxjs/Rx";

@Injectable()
export class LocalNotificationProvider {
	isReady: boolean = false;
	readyResolve: any;
	private notificationObservable: Observable<any>;
	private observer: any;

	constructor(
		public platform: Platform
	) {
		this.notificationObservable = Observable.create((subscriber) => {
			this.observer = subscriber;
		});

		LocalNotifications.on('trigger', (notification) => {
			let data = JSON.parse(notification.data);
			this.onNotificationReceived(data);
			if (data.runOneTime) {
				setTimeout(() => {
					LocalNotifications.clear(notification.id);
					LocalNotifications.cancel(notification.id);
				}, 1000);
			}
		});
	}

	/**
	 * Schedule a local notification
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	public static schedule(options) {
		options = {
			id: 1,
			title: 'Snapaday',
			text: 'Have you taken your snap today?',
			at: new Date(Date.now() + (10 * 1000)),
			every: 'minute',
			data: { runOneTime: true }
		}
		LocalNotifications.schedule(options);
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
			for(let key in data) {
				if (['wasTapped', 'from', 'collapse_key', 'notification'].indexOf(key) == -1) {
					customSettings[key] = data[key];
				}
			}
			customSettings.dateReceived = Date.now();
			object = {
				title: data.notification.title,
				content: data.notification.body,
				fromBackground: data.wasTapped,
				customSettings: customSettings,
				originalObject: data
			}
		} else if (this.platform.is('android')) {
			let customSettings: any = {};
			for(let key in data) {
				if (['wasTapped'].indexOf(key) == -1) {
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
			}
		}
		this.observer.next(object);
	}
}
