/***********************************************************************************************************
 * Requires:                                                                                               *
 * - `@ionic-native/fcm` node module                                                                       *
 * - `cordova-plugin-fcm` plugin                                                                           *
 * - Correct FCM files in 'src/assets/google-services.json' and 'src/assets/GoogleService-Info.plist'      *
 *     - ANDROID: All files are copied automagically                                                       *
 *     - IOS: After creating an ios build folder:                                                          *
 *         - copy 'platforms/ios/GoogleService-Info.plist' into the root of the Xcode project (drag/drop). *
 *         - enable push notification in Xcode project                                                     *
 ***********************************************************************************************************/

import { Injectable, isDevMode } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { Observable } from 'rxjs/Rx';

import {
	ApiGateway,
} from './api/api-gateway';
import {
	Settings,
} from './app-settings';

@Injectable()
export class PushNotificationProvider {
	public onNotification: Observable<any>;

	constructor(
		private platfrom: Platform,
		private fcm: FCM,
		private apiGateway: ApiGateway,
		private settings: Settings,
	) {
		this.platfrom.ready().then(() => {
			if (this.platfrom.is('cordova')) {
				// Subscribe to default channel
				this.fcm.subscribeToTopic('messages');
				// Subscribe to development channel when app is running in development mode
				if (isDevMode()) {
					this.fcm.subscribeToTopic('dev');
				}

				// FCM token handling
				this.updateToken();

				fcm.onTokenRefresh().subscribe((tokenString: any) => {
					this.uploadToken(tokenString);
				});

				// FCM notification observable
				this.onNotification = this.fcm.onNotification();
			} else if (isDevMode()) {
				// Mock Notification for browser testing when running in development mode
				this.onNotification = new Observable<any>((observer: any) => {
					setTimeout(() => {
						observer.next({
							from: '202326975122',
							collapse_key: 'nl.trimbos.watdrinkjij',
							wasTapped: true,
							'google.message_id': '0:1510827186605305%4503e3a34503e3a3',
							title: 'MockNotification',
							body: 'Mock Notification body',
							type: '0',
						});
					}, 2000);
				});
			}
		});
	}

	updateToken(): void {
		this.fcm.getToken().then((tokenString: any) => {
			this.uploadToken(tokenString);
		}).catch((error: any) => {
			console.log('error', error);
		});
	}

	/**
	 * Upload the FCM token to the server
	 * @param {string} token
	 */
	private uploadToken(token: string): void {
		console.log('tokenString', token);

		// Only allow setting the token if user is logged in since the request is authorized
		if (localStorage.getItem('auth-token')) {
			let method: string = 'profile.setDeviceId';
			let data: any = {
				appid: this.settings.appId,
				deviceId: token,
			};
			let request: Observable<any> = this.apiGateway.post(
				this.settings.apiEndpoint + method,
				null,
				data,
				true,
			);

			request.subscribe(() => {
				// Token successfully updated
			}, (error: any) => {
				console.log('error', error);
			});
		}
	}
}
