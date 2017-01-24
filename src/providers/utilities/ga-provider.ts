import { Injectable } from '@angular/core';
import { GoogleAnalytics } from 'ionic-native';

import { SETTINGS } from '../../settings/settings';

@Injectable()
export class GAProvider {
	private static isReady: boolean = false;
	private static queue: string[] = [];

	constructor() {
		GoogleAnalytics.startTrackerWithId(SETTINGS.GA_ID).then(() => {
			console.log('GA ready');
			GAProvider.isReady = true;
			while(GAProvider.queue.length) {
				GAProvider.trackView(GAProvider.queue.shift());
			}
		}).catch((error) => {
			console.log('Error starting GA', error);
		});
	}

	static trackView(key: string): void {
		if (GAProvider.isReady) {
			GoogleAnalytics.trackView(key);
		} else {
			GAProvider.queue.push(key);
		}
	}
}
