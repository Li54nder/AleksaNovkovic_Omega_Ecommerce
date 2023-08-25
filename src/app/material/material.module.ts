import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';

const array = [
  MatButtonModule,
]

@NgModule({
  imports: array,
  exports: array
})
export class MaterialModule { }
