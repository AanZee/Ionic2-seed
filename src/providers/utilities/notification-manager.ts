/*********************************************
 * Requires:                                 *
 * - ./utilities/local-notification-provider *
 * - ./storage-provider.ts                   *
 ********************************************/


import { Injectable } from '@angular/core';

import { ILocalNotification } from '@ionic-native/local-notifications';
import { LocalNotificationProvider, ILocalNotificationCopy } from './local-notification-provider';

import { StorageProvider } from './storage-provider';

@Injectable()
export class NotificationManager {
	private storageKey: string = 'notifications';
	private notifications: any = {};

	constructor(
		private localNotificationProvider: LocalNotificationProvider,
		private storage: StorageProvider,
	) {
		this.storage.getItem(this.storageKey).then((storageData: any) => {
			if (storageData) {
				this.notifications = storageData;
			}
		});
	}

	public toggleNotifications(state?: boolean): void {
		if (state === undefined) {
			state = !state;
		}

		if (!state) {
			this.localNotificationProvider.cancelAll();
		} else {
			let notificationsArray: Array<ILocalNotification> = Object.keys(this.notifications).map((key: any) => {
				return this.notifications[key];
			});
			this.localNotificationProvider.schedule(notificationsArray);
		}
	}

	public addNotification(notificationObject: ILocalNotificationCopy, omitToggle?: boolean): void {
		if (omitToggle) {
			this.localNotificationProvider.isScheduled(notificationObject.id).then((isScheduled: boolean) => {
				if (isScheduled) {
					this.updateNotification(notificationObject, omitToggle);
				}
			});
			return;
		}

		if (this.notifications[notificationObject.id]) {
			console.warn('A notification with this ID already exists. Updating...');
			return this.updateNotification(notificationObject, omitToggle);
		}
		this.notifications[notificationObject.id] = notificationObject;
		this.localNotificationProvider.schedule(notificationObject);
		this.saveNotifications();
	}

	public updateNotification(notificationObject: ILocalNotificationCopy, omitToggle?: boolean): void {
		if (omitToggle) {
			this.localNotificationProvider.isScheduled(notificationObject.id).then((isScheduled: boolean) => {
				if (!isScheduled) {
					this.addNotification(notificationObject, omitToggle);
				}
			});
			return;
		}

		if (!this.notifications[notificationObject.id]) {
			console.warn('A notification with this ID does not exist yet. Creating...');
			return this.addNotification(notificationObject, omitToggle);
		}
		this.notifications[notificationObject.id] = notificationObject;
		this.localNotificationProvider.update(notificationObject);
		this.saveNotifications();
	}

	public removeNotification(id: number, omitToggle?: boolean): void {
		if (omitToggle) {
			this.localNotificationProvider.cancel(id);
			return;
		}

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
