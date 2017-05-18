import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'select-switch',
	templateUrl: 'select-switch.html'
})
export class ComponentSelectSwitch {
	private selectedOption: number = 0;

	@Input() options: string[] = [];
	@Input()
	get selected(): number {
		return this.selectedOption;
	}
	set selected(val: number) {
		this.selectedOption = val;
		this.selectedChange.emit(this.selectedOption);
	}
	@Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
		if (this.selectedOption < 0) { this.select(0); }
		if (this.selectedOption > this.options.length - 1) { this.select(this.options.length - 1); }
	}

	public select(index: number): void {
		this.selectedOption = index;
		this.selected = this.selectedOption;
	}
}
