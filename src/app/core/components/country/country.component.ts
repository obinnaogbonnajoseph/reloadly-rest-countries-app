import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country } from 'src/app/core/models/model';
import { CountriesSelector } from 'store/selectors/countries.selector';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country$ = this.store.select(CountriesSelector.selectSelectedCountry);

  constructor(private store: Store, private router: Router) {}

  borderCountries(country: Country) {
    return country.borders;
  }

  getLanguages(country: Country): string | null {
    return (
      country?.languages
        .map((lang) => new TitleCasePipe().transform(lang.name))
        .join(',') ?? null
    );
  }

  back() {
    this.router.navigate(['countries']);
  }
}
