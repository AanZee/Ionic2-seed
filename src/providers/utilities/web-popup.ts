/**************************************************
 * Requires:                                      *
 * - `cordova-plugin-inappbrowser` plugin         *
 * - `cordova-plugin-safariviewcontroller` plugin *
 **************************************************/


import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InAppBrowser, SafariViewController } from 'ionic-native';

@Injectable()
export class WebPopup {

	constructor(
		public platform: Platform
	) {}

	/**
	 * Open an url in a inApp browser
	 * @param {[type]} url [description]
	 */
	public open(url): void {
		if (this.platform.is('cordova')) {
			SafariViewController.isAvailable().then((available: boolean) => {
				if (available) {
					SafariViewController.show({
						url: url,
						hidden: false,
						animated: false,
						transition: 'curl',
						enterReaderModeIfAvailable: false,
						tintColor: '#fd8a4a'
					}).then((result: any) => {
						if (result.event === 'opened') console.log('Opened');
						else if (result.event === 'loaded') console.log('Loaded');
						else if (result.event === 'closed') console.log('Closed');
					}, (error: any) => {
						console.error(error)
					});
				} else {
					new InAppBrowser(url, '_system', 'location=true');
				}
			});
		} else {
			window.open(url, '_blank');
		}
	}
}
