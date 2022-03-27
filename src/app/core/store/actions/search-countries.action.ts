import { createAction, props } from '@ngrx/store';
import { Country } from 'models/model';

export enum SearchCountriesTypes {
  SEARCH_COUNTRIES = `[Countries] Search Countries`,
  SEARCH_COUNTRIES_SUCCESS = `[Countries] Search Countries Success`,
  SEARCH_COUNTRIES_ERROR = `[Countries] Search Countries Error`,
}

export namespace SearchCountriesActions {
  export const searchCountries = createAction(
    SearchCountriesTypes.SEARCH_COUNTRIES,
    props<{ name: string }>()
  );

  export const searchCountriesSuccess = createAction(
    SearchCountriesTypes.SEARCH_COUNTRIES_SUCCESS,
    props<{ countries: Country[] }>()
  );

  export const searchCountriesError = createAction(
    SearchCountriesTypes.SEARCH_COUNTRIES_ERROR
  );
}
