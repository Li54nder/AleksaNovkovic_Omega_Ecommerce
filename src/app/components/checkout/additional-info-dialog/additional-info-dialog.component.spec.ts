import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoDialogComponent } from './additional-info-dialog.component';

describe('AdditionalInfoDialogComponent', () => {
  let component: AdditionalInfoDialogComponent;
  let fixture: ComponentFixture<AdditionalInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalInfoDialogComponent]
    });
    fixture = TestBed.createComponent(AdditionalInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
