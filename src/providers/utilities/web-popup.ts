/***************************************************
 * Requires:                                       *
 * - '@ionic-native/in-app-browser' module         *
 * - '@ionic-native/safari-view-controller' module *
 * - `cordova-plugin-inappbrowser` plugin          *
 * - `cordova-plugin-safariviewcontroller` plugin  *
 ***************************************************/


import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SafariViewController } from '@ionic-native/safari-view-controller';

@Injectable()
export class WebPopup {

	constructor(
		private inAppBrowser: InAppBrowser,
		private safariViewController: SafariViewController,
		private platform: Platform,
	) {}

	/**
	 * Open an url in a inApp browser
	 * @param {string} url [description]
	 */
	public open(url: string): void {
		if (this.platform.is('cordova')) {
			this.safariViewController.isAvailable().then((available: boolean) => {
				if (available) {
					this.safariViewController.show({
						url: url,
						hidden: false,
						animated: false,
						transition: 'curl',
						enterReaderModeIfAvailable: false,
						tintColor: '#fd8a4a'
					}).subscribe((result: any) => {
						if (result.event === 'opened') {
							console.log('Opened');
						} else if (result.event === 'loaded') {
							console.log('Loaded');
						} else if (result.event === 'closed') {
							console.log('Closed');
						}
					}, (error: any) => {
						console.error('error', error);
					});
				} else {
					this.inAppBrowser.create(url, '_system', 'location=true');
				}
			});
		} else {
			window.open(url, '_blank');
		}
	}
}
