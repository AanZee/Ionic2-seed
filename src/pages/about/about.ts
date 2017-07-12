import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@IonicPage({
	segment: 'about/:title'
})
@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class About {
	public title: string = this.navParams.get('title');

	constructor(
		public nav: NavController,
		public navParams: NavParams,
		public translate: TranslateService,
	) {
	}

	ionViewWillEnter(): void {
		this.translate.get('HOME.title').subscribe((translation: string) => {
			console.log(translation);
		});
	}
}
