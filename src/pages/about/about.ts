import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class About {

	constructor(
		public nav: NavController,
		public translate: TranslateService,
	) {
	}

	ionViewWillEnter(): void {
		this.translate.get('HOME.title').subscribe((translation: string) => {
			console.log(translation);
		});
	}
}
