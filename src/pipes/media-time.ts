import { Injectable, Pipe } from '@angular/core';

@Pipe({
	name: 'mediaTime'
})
@Injectable()
export class PipeMediaTime {
	// Takes a value and makes it lowercase.
	transform(value: string, args?: any): string {
		if (!isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
			let minutes: number = Math.max(Math.floor(parseFloat(value) / 60), 0);
			let seconds: number = Math.max(Math.floor(parseFloat(value) % 60), 0);
			let timestring: any = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return (args && timestring === '00:00' ? '' : timestring);
		} else {
			return '';
		}
	}
}
