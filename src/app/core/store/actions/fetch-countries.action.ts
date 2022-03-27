import { createAction, props } from '@ngrx/store';
import { Country, Region } from 'models/model';

export enum FetchCountriesTypes {
  FETCH_COUNTRIES = `[Countries] Fetch Countries`,
  FETCH_COUNTRIES_SUCCESS = `[Countries] Fetch Countries Success`,
  FETCH_COUNTRIES_ERROR = `[Countries] Fetch Countries Error`,
}

export namespace FetchCountriesActions {
  export const fetchCountries = createAction(
    FetchCountriesTypes.FETCH_COUNTRIES,
    props<{ region?: Region }>()
  );

  export const fetchCountriesSuccess = createAction(
    FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
    props<{ countries: Country[] }>()
  );

  export const fetchCountriesError = createAction(
    FetchCountriesTypes.FETCH_COUNTRIES_ERROR
  );
}
