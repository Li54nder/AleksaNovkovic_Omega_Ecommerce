import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';


const array = [
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  MatCardModule
]

@NgModule({
  imports: array,
  exports: array
})
export class MaterialModule { }
