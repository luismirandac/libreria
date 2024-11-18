import { TestBed } from '@angular/core/testing';

import { SucursalServiceService } from './sucursal-service.service';

describe('SucursalServiceService', () => {
  let service: SucursalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
