import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
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
            map((countries) => ({
              type: FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
              payload: countries,
            }))
          );
        }
        return this.countryService.getAll().pipe(
          map((countries) => ({
            type: FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
            payload: countries,
          }))
        );
      }),
      catchError(() => of({ type: FetchCountriesTypes.FETCH_COUNTRIES_ERROR }))
    );
  });

  searchCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchCountriesActions.searchCountries),
      concatLatestFrom(() =>
        this.store.select(CountriesSelector.selectCountries)
      ),
      mergeMap(([action, countries]) => {
        const filteredCountries = countries.filter((country) =>
          country.name.toLowerCase().includes(action.name.toLowerCase())
        );
        return of({
          type: SearchCountriesTypes.SEARCH_COUNTRIES_SUCCESS,
          payload: filteredCountries,
        });
      }),
      catchError(() =>
        of({ type: SearchCountriesTypes.SEARCH_COUNTRIES_ERROR })
      )
    );
  });

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
          payload: selectedCountry,
        });
      }),
      catchError(() => of({ type: SelectCountryTypes.SELECT_COUNTRY_ERROR }))
    );
  });
}
