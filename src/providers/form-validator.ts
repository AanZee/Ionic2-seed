import { Utilities } from './utilities/app-utilities';

export class FormValidator {

	static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
		let config: any = {
			'required': 'Dit veld is verplicht',
			'minlength': `Minimum length ${validatorValue.requiredLength}`,
			'invalidEmailAddress': 'Ongeldig email adres',
			'invalidPhoneNumber': 'Ongeldig telefoonnummer',
		};
		return config[validatorName];
	}

	static emailValidator(control: any): any {
		// RFC 2822 compliant regex
		if (control.value.match(Utilities.regexEmail)) {
			return null;
		} else {
			return { 'invalidEmailAddress': true };
		}
	}

	static phoneValidator(control: any): any {
		let value: string = control.value.replace(/\ /g, '');
		let regex_phone: RegExp = Utilities.regexPhone;
		if (value.match(regex_phone) || !value) {
			return null;
		} else {
			return { 'invalidPhoneNumber': true };
		}
	}
}
