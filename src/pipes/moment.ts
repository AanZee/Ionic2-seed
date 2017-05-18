/**********************************************
 * Requires:                                  *
 * - 'moment' module                          *
 **********************************************/


import { Pipe, Injectable } from '@angular/core';
import { default as moment } from 'moment';

@Pipe({
	name: 'moment'
})
@Injectable()
export class PipeMoment {

	transform(value: moment.Moment, args?: any): string {
		return moment().format(args || 'D MMMM YYYY');
	}
}
