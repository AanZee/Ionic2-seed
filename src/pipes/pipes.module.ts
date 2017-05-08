import { NgModule } from '@angular/core';

import { PipeFilterArrayBy } from './filter-array-by';
import { PipeMoment } from './moment';
import { PipeObjectToArray } from './object-to-array';
import { PipeOrderArrayBy } from './order-array-by';

@NgModule({
	declarations: [
		PipeFilterArrayBy,
		PipeMoment,
		PipeObjectToArray,
		PipeOrderArrayBy,
	],
	exports: [
		PipeFilterArrayBy,
		PipeMoment,
		PipeObjectToArray,
		PipeOrderArrayBy,
	]
})
export class PipesModule {}
