import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { PushNotificationProvider } from '../../providers/utilities/push-notification-provider';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public translate: TranslateService,
        public pushNotification: PushNotificationProvider
    ) {
    }

    ionViewWillEnter(): void {
        this.translate.get('HOME.title').subscribe((translation: string) => {
            console.log(translation);
        });

        this.pushNotification.init().then(() => {
            this.pushNotification.getToken().then((token: string) => {
                console.log('token', token);
            });
            this.pushNotification.subscribeToTopic('ionic2-seed');
            this.pushNotification.subscribeToNotifications('home', (data: any, fromForeground: boolean) => {
                console.log(data, fromForeground);
            });
        });
    }

    ionViewWillLeave(): void {
        this.pushNotification.unsubscribeFromNotifications('home');
    }
}
