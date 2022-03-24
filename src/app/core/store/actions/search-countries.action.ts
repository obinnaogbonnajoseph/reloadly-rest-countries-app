import { createAction, props } from '@ngrx/store';
import { Country } from 'models/model';

export const SearchCountries = `[Countries] Search Countries`;
export const SearchCountriesSuccess = `[Countries] Search Countries Success`;
export const SearchCountriesError = `[Countries] Search Countries Error`;

export namespace SearchCountriesActions {
  export const searchCountries = createAction(
    SearchCountries,
    props<{ name: string }>()
  );

  export const searchCountriesSuccess = createAction(
    SearchCountries,
    props<{ countries: Country[] }>()
  );

  export const searchCountriesError = createAction(SearchCountries);
}
