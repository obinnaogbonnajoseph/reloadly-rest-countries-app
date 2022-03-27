import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CountryName, Region } from 'models/model';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { SearchCountriesActions } from 'store/actions/search-countries.action';
import { SelectCountryActions } from 'store/actions/select-country.action';
import { CountriesSelector } from 'store/selectors/countries.selector';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  countries$ = this.store.select(CountriesSelector.selectCountries);
  loading$ = this.store.select(CountriesSelector.selectLoading);
  visitedCountries$ = this.store.select(
    CountriesSelector.selectVisitedCountries
  );

  constructor(private store: Store, private router: Router) {}

  selectCountry(name: CountryName): void {
    this.store.dispatch(SelectCountryActions.selectCountry({ name }));
    this.router.navigate(['country', name]);
  }

  searchCountry(inputEl: HTMLInputElement): void {
    fromEvent(inputEl, 'change')
      .pipe(
        debounceTime(500),
        map((event) =>
          ((event.target as HTMLInputElement)?.value ?? '').trim()
        ),
        distinctUntilChanged()
      )
      .subscribe((name) =>
        this.store.dispatch(SearchCountriesActions.searchCountries({ name }))
      );
  }

  filterByRegion(region: Region): void {
    this.store.dispatch(FetchCountriesActions.fetchCountries({ region }));
  }
}
