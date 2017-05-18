/************************************************************
 * Requires:                                                *
 * - '@ionic-native/local-notifications' module             *
 * - `de.appplant.cordova.plugin.local-notification` plugin *
 ************************************************************/


import { Injectable } from '@angular/core';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';

export interface ILocalNotificationExtended extends ILocalNotification {}

@Injectable()
export class LocalNotificationExtended extends LocalNotifications {

	private hotfixRunOnce(options: ILocalNotification): ILocalNotification {
		if (options.at) {
			options.firstAt = options.at;
			delete options.at;
			options.every = 'year';
			if (options.data) {
				options.data.runOnce = true;
			} else {
				options.data = { runOnce: true };
			}
		}
		return options;
	}

	schedule(options?: ILocalNotification): void {
		options = this.hotfixRunOnce(options);
		super.schedule(options);
	}

	on(eventName: string, callback: any): void {
		super.on(eventName, (notification: ILocalNotification) => {
			if (notification.data && JSON.parse(notification.data).runOnce) {
				super.cancel(notification.id);
			}
			notification.data = JSON.parse(notification.data);
			callback(notification);
		});
	}
}
