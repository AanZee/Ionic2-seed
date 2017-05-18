import { Platform } from 'ionic-angular';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
	selector: 'button-toolbar',
	templateUrl: 'button-toolbar.html'
})
export class ComponentButtonToolbar {
	@ViewChild('buttonToolbar') button_toolbar: any;
	private selectedOption: number = 0;

	@Input() toolbarButtons: string[] = [];
	@Input()
	get selected(): number {
		return this.selectedOption;
	}
	set selected(val: number) {
		this.selectedOption = val;
		this.slideToolbar();
		this.selectedChange.emit(this.selectedOption);
	}
	@Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

	private ready: boolean = false;

	constructor(
		private platform: Platform
	) {
		platform.ready().then(() => {
			this.ready = true;
		});

		if (this.selectedOption < 0) { this.select(0); }
		if (this.selectedOption > this.toolbarButtons.length - 1) { this.select(this.toolbarButtons.length - 1); }
	}

	public select(index: number): void {
		this.selected = index;
	}

	private slideInterval: any = null;
	private slideToolbar(): void {
		//If new item not fully in screen, scroll so it is as centered as possible
		if (this.ready) {
			//Clear previous animation
			if (this.slideInterval) {
				clearInterval(this.slideInterval);
				this.slideInterval = null;
			}
			//Get values
			let pager: any = this.button_toolbar.nativeElement;
			let buttons: any[] = pager.children[0].getElementsByTagName('button');
			let curr_button: any = buttons[this.selectedOption];
			if (curr_button) {
				let wrapper_bb: any = pager.getBoundingClientRect();
				let button_bb: any = curr_button.getBoundingClientRect();

				//Animation variables
				let movement_speed: number = 300;
				let refresh_time: number = 10;
				let iteration: number = 0;
				let diff: number = button_bb.left - ((wrapper_bb.width / 2) - (button_bb.width / 2));

				//Check if diff is out of scroll range and adjust accordingly
				let curr_scroll: number = pager.scrollLeft;
				if (diff > 0 && diff > (pager.scrollWidth - pager.clientWidth) - curr_scroll) {
					diff = (pager.scrollWidth - pager.clientWidth) - curr_scroll;
				} else if (diff < 0 && diff < -curr_scroll) {
					diff = -curr_scroll;
				}
				//Animate the scroll
				this.slideInterval = setInterval(() => {
					curr_scroll += diff / (movement_speed / refresh_time);
					pager.scrollLeft = curr_scroll;
					iteration++;
					if (iteration >= (movement_speed / refresh_time)) {
						clearInterval(this.slideInterval);
						this.slideInterval = null;
					}
				}, refresh_time);
			}
		}
	}
}
