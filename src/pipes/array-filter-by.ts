import { Pipe, Injectable } from '@angular/core';

@Pipe({
	name: 'filterArrayBy'
})
@Injectable()
export class PipeArrayFilterBy {

	transform(list: any[], filterKeys: string[], filterValue: any): any {
		return list.filter((item: any) => {
			let comparator: any;
			for (let iterator: number = 0; iterator < filterKeys.length; iterator++) {
				if (!item[filterKeys[iterator]]) {
					return false;
				}
				comparator = item[filterKeys[iterator]];
			}
			return comparator === filterValue;
		});
	}
}
