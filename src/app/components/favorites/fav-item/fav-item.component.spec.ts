import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavItemComponent } from './fav-item.component';

describe('FavItemComponent', () => {
  let component: FavItemComponent;
  let fixture: ComponentFixture<FavItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavItemComponent]
    });
    fixture = TestBed.createComponent(FavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
