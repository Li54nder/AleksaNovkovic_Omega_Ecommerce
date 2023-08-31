import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-additional-info-dialog',
  templateUrl: './additional-info-dialog.component.html',
  styleUrls: ['./additional-info-dialog.component.scss']
})
export class AdditionalInfoDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdditionalInfoDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      address: '',
      phone_number: ['', Validators.required],
      message: ''
    })
  }

  purchase() {
    this.dialogRef.close(true);
  }

}
