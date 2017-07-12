import { Component, forwardRef, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export interface IComponentSelectSwitchOption {
	label: string;
	value: string | number;
}

export function createCounterRangeValidator(options: any[]): any {
	return (c: FormControl) => {
		let err: any = {
			invalidValueError: {
				given: c.value
			}
		};
		// Check if value is set and value exists in given options
		return (!c.value || !options.find((option: IComponentSelectSwitchOption) => option.value === c.value)) ? err : null;
	};
}

@Component({
	selector: 'select-switch',
	templateUrl: 'select-switch.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ComponentSelectSwitch), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ComponentSelectSwitch), multi: true }
	]
})
export class ComponentSelectSwitch implements ControlValueAccessor, OnChanges {
	propagateChange: Function = () => {};
	validateFunction: Function = () => {};

	@Input() options: IComponentSelectSwitchOption[] = [];
	@Input('selectedValue') _selectedValue: string | number;
	@Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();

	get selectedValue(): string | number {
		return this._selectedValue;
	}

	set selectedValue(val: string | number) {
		this._selectedValue = val;
		this.propagateChange(val);
		this.selectedValueChange.emit(val);
	}

	ngOnChanges(inputs: any): void {
		if (inputs.counterRangeMax || inputs.counterRangeMin) {
			this.validateFunction = createCounterRangeValidator(this.options);
			this.propagateChange(this.selectedValue);
		}
	}

	writeValue(value: string | number): void {
		if (value) {
			this.selectedValue = value;
		}
	}

	registerOnChange(fn: Function): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void {}

	setValue(value: string | number, event?: any): void {
		if (event) {
			event.preventDefault();
		}

		this.selectedValue = value;
	}

	validate(formControl: FormControl): any {
		return this.validateFunction(formControl);
	}
}
