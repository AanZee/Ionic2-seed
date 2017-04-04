/**********************************************
 * Requires:                                  *
 * - 'moment' module                          *
 **********************************************/


import { Injectable, Pipe } from '@angular/core';
import { default as moment } from 'moment';

@Pipe({
	name: 'moment'
})
@Injectable()
export class PipeMoment {

	transform(value: moment.Moment, args?: any) {
		return moment().format(args || 'D MMMM YYYY');
	}
}
