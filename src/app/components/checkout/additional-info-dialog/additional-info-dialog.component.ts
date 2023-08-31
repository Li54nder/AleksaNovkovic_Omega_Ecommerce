import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-additional-info-dialog',
  templateUrl: './additional-info-dialog.component.html',
  styleUrls: ['./additional-info-dialog.component.scss']
})
export class AdditionalInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AdditionalInfoDialogComponent>
  ) {}

  purchase() {
    this.dialogRef.close(true);
  }

}
