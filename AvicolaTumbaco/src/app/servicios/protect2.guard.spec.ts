import { TestBed } from '@angular/core/testing';

import { Protect2Guard } from './protect2.guard';

describe('Protect2Guard', () => {
  let guard: Protect2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Protect2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
