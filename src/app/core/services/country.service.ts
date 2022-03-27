import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, Region } from 'models/model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    return of([]);
  }

  getRegion(region: Region): Observable<Country[]> {
    return of([]);
  }
}
