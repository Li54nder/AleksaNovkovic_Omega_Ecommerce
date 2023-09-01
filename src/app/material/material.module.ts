import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const array = [
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
];

@NgModule({
  imports: array,
  exports: array,
})
export class MaterialModule {}
