import { TestBed } from '@angular/core/testing';

import { LocaleStorageService } from './locale-storage.service';

describe('LocaleStorageService', () => {
  let service: LocaleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
