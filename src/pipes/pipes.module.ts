import { NgModule } from '@angular/core';

import { PipeMoment } from './moment';
import { PipeObjectToArray } from './object-to-array';
import { PipeArrayFilterBy } from './array-filter-by';
import { PipeArrayOrderBy } from './array-order-by';

@NgModule({
	declarations: [
		PipeMoment,
		PipeObjectToArray,
		PipeArrayFilterBy,
		PipeArrayOrderBy,
	],
	exports: [
		PipeMoment,
		PipeObjectToArray,
		PipeArrayFilterBy,
		PipeArrayOrderBy,
	]
})
export class PipesModule {}
