import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, Region } from 'models/model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  baseurl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseurl}all`);
  }

  getRegion(region: Region): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseurl}continent/${region}`);
  }

  searchByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseurl}name/${name}`);
  }
}
