import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, Region } from 'models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  baseurl = 'https://restcountries.com/v2/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseurl}all`);
  }

  getRegion(region: Region): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseurl}continent/${region}`);
  }
}
