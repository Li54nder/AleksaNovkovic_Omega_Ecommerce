import { TestBed } from '@angular/core/testing';

import { BSubjectUserService } from './b-subject-user.service';

describe('BSubjectUserService', () => {
  let service: BSubjectUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BSubjectUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
