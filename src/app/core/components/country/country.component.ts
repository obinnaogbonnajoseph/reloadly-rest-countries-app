import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from 'src/app/core/models/model';
import { CountriesSelector } from 'store/selectors/coutries.selector';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country$ = this.store.select(CountriesSelector.selectSelectedCountry);
  loading$ = this.store.select(CountriesSelector.selectLoading);

  constructor(private store: Store) {}

  borderCountries(country: Country) {
    return country.borders;
  }
}
