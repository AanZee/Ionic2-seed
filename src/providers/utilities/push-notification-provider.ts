import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var FCMPlugin;

/*
    TODO:
    - replace 'src/assets/google-services.json' and 'src/assets/GoogleService-Info.plist' with correct files
    - ANDROID: After creating an android build folder:
        - copy 'src/assets/google-services.json' to 'platforms/android/' folder
        - run 'ionic build android'
    - IOS: After creating an ios build folder:
        - copy 'src/assets/GoogleService-Info.plist' into the root of the Xcode project.
        - enable push notification is Xcode project
 */

@Injectable()
export class PushNotificationProvider {
    isReady: boolean = false;
    subscribers: any = {};
    readyResolve: any;

    constructor(
        public platform: Platform
    ) {
        this.platform.ready().then(() => {
            if (typeof (FCMPlugin) !== 'undefined') {
                this.isReady = true;
                if (this.readyResolve) {
                    this.readyResolve();
                }

                FCMPlugin.onNotification((data: any) => {
                    this.onNotificationReceived(data);
                }, (msg) => {
                    console.log('onNotification callback successfully registered:', msg);
                }, (err) => {
                    console.log('Error registering onNotification callback:', err);
                });
            } else {
                console.log('Push-notifications disabled, only provided in Android/iOS environments');
            }
        });
    }

    init(): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.isReady) {
                this.readyResolve = resolve;
            } else {
                resolve();
            }
        });
    }

    subscribeToNotifications(key: string, method: any): void {
        if (this.subscribers[key]) {
            console.log('overriding notification callback for key', key);
        }
        this.subscribers[key] = method;
    }

    unsubscribeFromNotifications(key: string): void {
        this.subscribers[key] = undefined;
    }

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
            object = {
                titel: data.notification.title,
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
            object = {
                titel: '',
                content: '',
                fromBackground: data.wasTapped,
                customSettings: customSettings,
                originalObject: data
            }
        }
        for(let key in this.subscribers) {
            this.subscribers[key](object);
        }
    }

    getToken(): Promise<string> {
        return new Promise((resolve: any, reject: any) => {
            if (this.isReady) {
                FCMPlugin.getToken((token: string) => {
                    // Use this token for sending device specific messages
                    resolve(token);
                }, (err: any) => {
                    console.log('error getting token', err);
                    reject();
                });
            } else {
                console.log('notification plugin not ready');
                reject();
            }
        });
    }
    
    subscribeToTopic(topic: string): void {
        if (this.isReady) {
            FCMPlugin.subscribeToTopic(topic);
        }
    }

    unsubscribeFromTopic(topic: string): void {
        if (this.isReady) {
            FCMPlugin.unsubscribeFromTopic(topic);
        }
    }
}
