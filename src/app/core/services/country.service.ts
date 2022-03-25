import { Injectable } from '@angular/core';
import { Country, Region } from 'models/model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor() {}

  getAll(): Observable<Country[]> {
    return of([]);
  }

  getRegion(region: Region): Observable<Country[]> {
    return of([]);
  }
}
