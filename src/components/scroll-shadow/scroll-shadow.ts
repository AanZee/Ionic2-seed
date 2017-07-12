import { Directive, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';

@Directive({
	selector: '[scroll-shadow]'
})
export class ComponentScrollShadow {

	constructor(
		private elem: ElementRef,
		private platform: Platform
	) {
		/**
		 * Workaround for 'background-attachment: local' not working in combination with '-webkit-overflow-scrolling: touch'
		 * see http://caniuse.com/#feat=background-attachment
		 */
		if (this.platform.is('ios')) {
			this.elem.nativeElement.addEventListener('scroll', () => {
				if (this.elem.nativeElement.scrollTop > 0) {
					this.elem.nativeElement.classList.add('scroll_shadow--forced');
				} else {
					this.elem.nativeElement.classList.remove('scroll_shadow--forced');
				}
			});
		}
	}
}
