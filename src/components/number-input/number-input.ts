import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export function createSelectionValidator(): any {
	return (c: FormControl) => {
		let err: any = {
			invalidValueError: {
				given: c.value
			}
		};
		// Check if value is set
		return c.value ? err : null;
	};
}

@Component({
	selector: 'number-input',
	templateUrl: 'number-input.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ComponentNumberInput), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ComponentNumberInput), multi: true }
	]
})
export class ComponentNumberInput implements ControlValueAccessor {
	propagateChange: Function = () => {};
	validateFunction: Function = () => {};

	@Input('disabled') isEditDisabled: boolean;
	@Input() minValue: number;
	@Input() maxValue: number;
	@Input('value') _value: string;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

	get value(): string {
		return this._value;
	}

	set value(val: string) {
		this._value = val;
		this.propagateChange(parseInt(val));
		this.valueChange.emit(parseInt(val));
	}

	constructor() {}

	public subtract(event?: any): void {
		if (event) {
			event.preventDefault();
		}

		let tempValue: number = parseInt(this.value || '0') - 1;
		if (this.minValue && tempValue < this.minValue) {
			tempValue = this.minValue;
		}
		this.value = '' + tempValue;
	}

	public increment(event?: any): void {
		if (event) {
			event.preventDefault();
		}
		let tempValue: number = parseInt(this.value || '0') + 1;
		if (this.maxValue && tempValue > this.maxValue) {
			tempValue = this.maxValue;
		}
		this.value = '' + tempValue;
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: Function): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void {}

	validate(formControl: FormControl): any {
		return this.validateFunction(formControl);
	}
}
