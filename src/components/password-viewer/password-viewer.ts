import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'password-viewer',
	templateUrl: 'password-viewer.html'
})
export class ComponentPasswordViewer {
	private _valueVisible: boolean = false;
	private _value: string = '';

	@Input() icon_visible: string;
	@Input() icon_invisible: string;
	@Input()
	get value(): string {
		return this._value;
	}
	set value(value: string) {
		this._value = value;
		this.valueChange.emit(this._value);
	}
	@Output() valueChange: EventEmitter<any> = new EventEmitter();

	constructor() {}

	public toggleView(state?: boolean, event?: any): void {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		if (typeof state === 'undefined') {
			state = !this._valueVisible;
		}
		this._valueVisible = state;
	}
}
