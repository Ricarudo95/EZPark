import { TestBed } from '@angular/core/testing';

import { ParklotService } from './parklot.service';

describe('ParklotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParklotService = TestBed.get(ParklotService);
    expect(service).toBeTruthy();
  });
});
