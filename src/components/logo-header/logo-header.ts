import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[logo-header]',
  templateUrl: 'logo-header.html',
})
export class ComponentLogoHeader {
	private selectedOption: number = 0;

	@Input() modalView: any;
	@Input() toolbarButtons: string[] = [];
	@Input()
	get selected() {
		return this.selectedOption;
	}
	set selected(val) {
		this.selectedOption = val;
		this.selectedChange.emit(this.selectedOption);
	}
	@Output() selectedChange = new EventEmitter();

	public constructor() {
		if (this.selectedOption < 0) { this.select(0); }
	}

	public select(index: number): void {
		this.selected = index;
	}

	public closeModal(): void {
		if (this.modalView && this.modalView.dismiss) {
			this.modalView.dismiss();
		}
	}
}
