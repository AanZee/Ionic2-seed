import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: string = 'Home';

	constructor(
		private platform: Platform,
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
	}
}
