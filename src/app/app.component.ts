import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

@Component({
	templateUrl: 'app.html',
})
export class MyApp {
	public rootPage: string = 'Home';
	public menuContent: any = {};

	constructor(
		private platform: Platform,
		private events: Events,
		private translate: TranslateService,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
	) {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.translate.setDefaultLang('en');
			this.translate.use('en');
		});

		this.events.subscribe('menuContentUpdate', (menuData: any) => {
			if (menuData) {
				this.menuContent = menuData;
			}
		});
	}
}
