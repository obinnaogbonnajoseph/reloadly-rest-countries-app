import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Country } from 'models/model';
import { catchError, map, mergeMap, Observable, of, take } from 'rxjs';
import { CountryService } from 'services/country.service';
import {
  FetchCountriesActions,
  FetchCountriesTypes,
} from 'store/actions/fetch-countries.action';
import {
  SearchCountriesActions,
  SearchCountriesTypes,
} from 'store/actions/search-countries.action';
import {
  SelectCountryActions,
  SelectCountryTypes,
} from 'store/actions/select-country.action';
import { CountriesSelector } from 'store/selectors/countries.selector';

@Injectable()
export class CountriesEffects {
  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store: Store
  ) {}

  fetchCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchCountriesActions.fetchCountries),
      mergeMap((action) => {
        if (action?.region) {
          return this.countryService.getRegion(action.region).pipe(
            take(1),
            map((countries) => ({
              type: FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
              countries,
            }))
          );
        }
        return this.countryService.getAll().pipe(
          map((countries) => ({
            type: FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
            countries,
          }))
        );
      }),
      catchError(() => of({ type: FetchCountriesTypes.FETCH_COUNTRIES_ERROR }))
    );
  });

  searchCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchCountriesActions.searchCountries),
      mergeMap((action) => {
        const searchParam = action.name.trim() ?? '';
        return this.searchCountries(searchParam).pipe(
          take(1),
          map((countries) => ({
            type: SearchCountriesTypes.SEARCH_COUNTRIES_SUCCESS,
            countries,
          }))
        );
      }),
      catchError(() =>
        of({ type: SearchCountriesTypes.SEARCH_COUNTRIES_ERROR })
      )
    );
  });

  private searchCountries(param: string): Observable<Country[]> {
    if (param) {
      return this.countryService.searchByName(param);
    }
    return this.countryService.getAll();
  }

  selectCountry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectCountryActions.selectCountry),
      concatLatestFrom(() =>
        this.store.select(CountriesSelector.selectCountries)
      ),
      mergeMap(([action, countries]) => {
        const selectedCountry = countries.find(
          (country) => country.name.toLowerCase() === action.name.toLowerCase()
        );
        return of({
          type: SelectCountryTypes.SELECT_COUNTRY_SUCCESS,
          country: selectedCountry,
        });
      }),
      catchError(() => of({ type: SelectCountryTypes.SELECT_COUNTRY_ERROR }))
    );
  });
}
