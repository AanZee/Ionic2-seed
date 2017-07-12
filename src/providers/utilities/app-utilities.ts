/*************
 * Utilities *
 *************/


import { Injectable } from '@angular/core';

@Injectable()
export class Utilities {
	public static readonly regexEmail: RegExp = (/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i);
	public static readonly regexPassword: RegExp = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^\s]{8,}$/);
	public static readonly regexPhone: RegExp = (/^(((0031|\+31|0)([-]?)(([0-9]){2}|6{1}))([-]?)([0-9]{7}))$/i);

	public static shuffleArray(array: any[]): any[] {
		let currentIndex: number = array.length;
		while (currentIndex > 0) {
			// Pick index of random element with index < currentIndex
			let randomIndex: number = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// Swap element with random element
			let temporaryValue: any = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
}
