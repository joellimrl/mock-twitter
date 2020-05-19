import { TestBed } from '@angular/core/testing';

import { Cookies } from './cookie.service';

describe('CookieService', () => {
  let service: Cookies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cookies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
