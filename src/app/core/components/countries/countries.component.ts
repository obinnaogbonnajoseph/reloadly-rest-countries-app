import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CountryName, Region } from 'models/model';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  takeWhile,
} from 'rxjs';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { SearchCountriesActions } from 'store/actions/search-countries.action';
import { SelectCountryActions } from 'store/actions/select-country.action';
import { CountriesSelector } from 'store/selectors/countries.selector';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, AfterViewInit, OnDestroy {
  countries$ = this.store.select(CountriesSelector.selectCountries);
  loading$ = this.store.select(CountriesSelector.selectLoading);
  loading = false;
  isComponentActive = true;
  visitedCountries$ = this.store.select(
    CountriesSelector.selectVisitedCountries
  );
  regions: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  @ViewChild('searchInput')
  private searchEl!: ElementRef<HTMLInputElement>;

  constructor(private store: Store, private router: Router) {}

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  ngOnInit(): void {
    this.store.dispatch(FetchCountriesActions.fetchCountries({}));
    this.loading$
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe((loading) => (this.loading = loading));
  }

  ngAfterViewInit(): void {
    this.searchCountry();
  }

  selectCountry(name: CountryName): void {
    this.store.dispatch(SelectCountryActions.selectCountry({ name }));
    this.router.navigate(['country', name]);
  }

  searchCountry(): void {
    if (this.searchEl) {
      fromEvent(this.searchEl.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          map((event) =>
            ((event.target as HTMLInputElement)?.value ?? '').trim()
          ),
          distinctUntilChanged()
        )
        .subscribe((name) => {
          this.store.dispatch(SearchCountriesActions.searchCountries({ name }));
        });
    }
  }

  filterByRegion(region: Region): void {
    this.store.dispatch(FetchCountriesActions.fetchCountries({ region }));
  }
}
