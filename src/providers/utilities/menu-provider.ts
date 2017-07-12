import { Injectable } from '@angular/core';
import { Events, MenuController } from 'ionic-angular';

export interface IMenuContent {
	title: string;
	header: string;
	content: string;
}

@Injectable()
export class MenuProvider {

	constructor(
		private events: Events,
		private menuController: MenuController,
	) {}

	public openMenuWithContent(content: IMenuContent): void {
		this.events.publish('menuContentUpdate', content);
		this.menuController.toggle();
	}
}
