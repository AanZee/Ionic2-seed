/***************************************
 * Requires:                           *
 * - `cordova-plugin-qrscanner` plugin *
 ***************************************/


import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';

declare let QRScanner: any;

@Injectable()
export class QrScanner {
	public isLightOn: boolean = false;
	public isScanning: boolean = false;

	constructor(
		private zone: NgZone,
		private platform: Platform,
	) {
		if (!platform.is('cordova')) {
			console.warn('Scanner is not availlable on non-cordova applications');
		}
	}

	/**
	* [scanStart description]
	* @return {Promise<any>} [description]
	*/
	public scanStart(): Promise<any> {
		return new Promise((resolve: any, reject: any) => {
			if (this.platform.is('cordova')) {
				this.isScanning = true;
				document.body.style.visibility = 'hidden';
				QRScanner.scan((err: any, contents: any) => {
					this.zone.run(() => {
						if (err) {
							console.log('Error scanning', err);
							reject();
						} else {
							// // Code to show user a 'snapshot' of the scanned code
							// QRScanner.pausePreview((status) => {
							// 	setTimeout(() => {
							// 		QRScanner.resumePreview(function(status){});
							// 	}, 300);
							// });

							resolve(contents);
						}
						this.scanStop();
					});
				});

				QRScanner.show((status: any) => {
					console.log(status);
				});
			}
		});
	}

	/**
	* [scanStop description]
	*/
	public scanStop(): void {
		if (this.platform.is('cordova') && this.isScanning === true) {
			this.isScanning = false;
			document.body.style.visibility = 'visible';

			this.toggleLight(false);

			QRScanner.cancelScan((status: any) => {
				console.log(status);
			});

			QRScanner.hide((status: any) => {
				console.log(status);
			});
		}
	}

	/**
	* [toggleLight description]
	* @param {boolean} state [description]
	*/
	public toggleLight(state?: boolean): void {
		if (this.platform.is('cordova')) {
			if (typeof state === 'undefined') {
				state = !this.isLightOn;
			}
			if (state) {
				QRScanner.enableLight((err: any, status: any) => {
					if (err) {
						console.error(err);
					} else {
						this.isLightOn = true;
					}
				});
			} else {
				QRScanner.disableLight((err: any, status: any) => {
					if (err) {
						console.error(err);
					} else {
						this.isLightOn = false;
					}
				});
			}
		}
	}
}
