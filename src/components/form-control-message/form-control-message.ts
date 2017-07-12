import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidator } from '../../providers/utilities/form-validator';

@Component({
	selector: 'form-error-message',
	template: '<div *ngIf="errorMessage !== null">{{errorMessage}}</div>'
})
export class ComponentFormControlMessage {
	@Input() control: FormControl;

	constructor(
		private formValidator: FormValidator,
	) {}

	public get errorMessage(): string {
		for (let propertyName in this.control.errors) {
			if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
				return this.formValidator.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
			}
		}
		return null;
	}
}
