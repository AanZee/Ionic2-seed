import { Injectable, Pipe } from '@angular/core';

@Pipe({
	name: 'objectToArray'
})
@Injectable()
export class PipeObjectToArray {

	transform(value: any, args?: any[]) {
		let array: any[] = [];
		if (value instanceof Object) {
			for (let key in value) {
				if (value.hasOwnProperty(key)) {
					array.push({
						key: key,
						obj: value[key]
					});
				}
			}
		}
		return array;
	}
}
