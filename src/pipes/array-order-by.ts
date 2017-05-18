import { Pipe, Injectable } from '@angular/core';

@Pipe({
	name: 'orderArrayBy'
})
@Injectable()
export class PipeArrayOrderBy {

	transform(list: any[], orderKeys: string[], orderDesc?: boolean): any {
		list.sort((a: any, b: any) => {
			let valA: any = a;
			let valB: any = b;
			for (let iterator: number = 0; iterator < orderKeys.length; iterator++) {
				if (valA && valB && (valA.hasOwnProperty(orderKeys[iterator]) || valB.hasOwnProperty(orderKeys[iterator]))) {
					valA = valA[orderKeys[iterator]];
					valB = valB[orderKeys[iterator]];
				} else {
					console.warn('Sort pipe: orderKey' + orderKeys[iterator] + 'does not exist on either object. comparing on higher level.');
					break;
				}
			}
			if (valA < valB) { return -1; }
			if (valA > valB) { return 1; }
			return 0;
		});

		if (orderDesc) {
			list = list.reverse();
		}
		return list;
	}
}
