import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'select-switch',
	templateUrl: 'select-switch.html'
})
export class SelectSwitchComponent {
	private selectedOption: number = 0;

	@Input() options: string[] = [];
	@Input()
	get selected() {
		return this.selectedOption;
	}
	set selected(val) {
		this.selectedOption = val;
		this.selectedChange.emit(this.selectedOption);
	}
	@Output() selectedChange = new EventEmitter();

	constructor() {
		if (this.selectedOption < 0) { this.select(0); }
		if (this.selectedOption > this.options.length - 1) { this.select(this.options.length - 1); }
	}

	public select(index: number): void {
		this.selectedOption = index;
		this.selected = this.selectedOption;
	}
}
