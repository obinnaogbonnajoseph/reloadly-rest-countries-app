import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CountryService } from './country.service';
import { HttpClient } from '@angular/common/http';
import { mockCountry } from 'models/mock.model';
import { Country } from 'models/model';

describe('CountryService', () => {
  let service: CountryService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  afterEach(() => httpTestingController.verify());

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountryService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all countries', (done: DoneFn) => {
    service.getAll().subscribe((data) => {
      expect(data).toEqual([mockCountry as Country]);
      done();
    });
    const req = httpTestingController.expectOne('/apiall');
    req.flush([mockCountry as Country]);
  });

  it('should get all countries by region', (done: DoneFn) => {
    service.getRegion('africa').subscribe((data) => {
      expect(data).toEqual([mockCountry as Country]);
      done();
    });
    const req = httpTestingController.expectOne('/apicontinent/africa');
    req.flush([mockCountry as Country]);
  });

  it('should search by name', (done: DoneFn) => {
    service.searchByName('Nigeria').subscribe((data) => {
      expect(data).toEqual([mockCountry as Country]);
      done();
    });
    const req = httpTestingController.expectOne('/apiname/Nigeria');
    req.flush([mockCountry as Country]);
  });
});
