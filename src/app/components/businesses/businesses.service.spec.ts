import { TestBed, inject } from '@angular/core/testing';

import { BusinessesService } from './businesses.service';

describe('BusinessesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessesService]
    });
  });

  it('should be created', inject([BusinessesService], (service: BusinessesService) => {
    expect(service).toBeTruthy();
  }));
});
