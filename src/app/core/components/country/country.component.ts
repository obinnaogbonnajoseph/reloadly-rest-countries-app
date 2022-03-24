import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { Country, CountryName } from 'src/app/core/models/model';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  country: Country | null = null;

  constructor(private route: ActivatedRouteSnapshot, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.country = await firstValueFrom(this.getCountryData());
  }

  getCountryData(): Observable<Country> {
    const countryName: CountryName | null = this.route.paramMap.get('name');
    return this.store.getcountry(countryName);
  }
}
