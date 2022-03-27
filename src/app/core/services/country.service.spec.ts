import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CountryService } from './country.service';
import { HttpClient } from '@angular/common/http';

describe('CountryService', () => {
  let service: CountryService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

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
      expect(data.length).toEqual(0);
      done();
    });
  });

  it('should get all countries by region', (done: DoneFn) => {
    service.getRegion('africa').subscribe((data) => {
      expect(data.length).toEqual(0);
      done();
    });
  });
});
