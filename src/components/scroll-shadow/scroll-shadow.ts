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
			elem.nativeElement.addEventListener('scroll', () => {
				if (elem.nativeElement.scrollTop > 0) {
					elem.nativeElement.classList.add('forced');
				} else {
					elem.nativeElement.classList.remove('forced');
				}
			});
		}
	}
}
