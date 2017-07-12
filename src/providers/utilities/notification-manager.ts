/**********************************************************
 * Requires:                                              *
 * - module @ionic-native/local-notifications             *
 * - plugin de.appplant.cordova.plugin.local-notification *
 * - ./storage-provider.ts                                *
 *********************************************************/

/*******************************

!! IMPORTANT: This provider is not finished yet and thus should not be used as-is !!

*******************************/

import { Injectable } from '@angular/core';

import { LocalNotificationExtended, ILocalNotificationExtended } from './local-notification-extended';

import { StorageProvider } from './storage-provider';

@Injectable()
export class NotificationManager {
	private storageKey: string = 'notifications';
	private notifications: any = {};

	constructor(
		private localNotificationProvider: LocalNotificationExtended,
		private storage: StorageProvider,
	) {
		this.storage.getItem(this.storageKey).then((storageData: any) => {
			if (storageData) {
				this.notifications = storageData;
			}
		});
	}

	public toggleNotifications(state?: boolean): void {
		// @TODO: turn notifications on/off
	}

	public addNotification(notificationObject: ILocalNotificationExtended): void {
		if (this.notifications[notificationObject.id]) {
			console.warn('A notification with this ID already exists. Updating...');
			return this.updateNotification(notificationObject);
		}
		this.notifications[notificationObject.id] = notificationObject;
		this.localNotificationProvider.schedule(notificationObject);
		this.saveNotifications();
	}

	public updateNotification(notificationObject: ILocalNotificationExtended): void {
		if (!this.notifications[notificationObject.id]) {
			console.warn('A notification with this ID does not exist yet. Creating...');
			return this.addNotification(notificationObject);
		}
		this.notifications[notificationObject.id] = notificationObject;
		this.localNotificationProvider.update(notificationObject);
		this.saveNotifications();
	}

	public removeNotification(id: number): void {
		if (!this.notifications[id]) {
			console.warn('A notification with this ID does not exist yet');
			return;
		}
		delete this.notifications[id];
		this.localNotificationProvider.cancel(id);
		this.saveNotifications();
	}

	private saveNotifications(): void {
		this.storage.setItem(this.storageKey, this.notifications);
	}
}
