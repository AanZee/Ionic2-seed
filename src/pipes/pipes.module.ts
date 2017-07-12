import { NgModule } from '@angular/core';

import { PipeMoment } from './moment';
import { PipeMediaTime } from './media-time';
import { PipeObjectToArray } from './object-to-array';
import { PipeArrayFilterBy } from './array-filter-by';
import { PipeArrayOrderBy } from './array-order-by';

@NgModule({
	declarations: [
		PipeMoment,
		PipeMediaTime,
		PipeObjectToArray,
		PipeArrayFilterBy,
		PipeArrayOrderBy,
	],
	exports: [
		PipeMoment,
		PipeMediaTime,
		PipeObjectToArray,
		PipeArrayFilterBy,
		PipeArrayOrderBy,
	]
})
export class PipesModule {}
