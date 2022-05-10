import { createAction, props } from '@ngrx/store';
import { Country, Region } from 'models/model';

export enum FetchCountriesTypes {
  FETCH_COUNTRIES = `[Countries] Fetch Countries`,
  FETCH_COUNTRIES_SUCCESS = `[Countries] Fetch Countries Success`,
  FETCH_COUNTRIES_ERROR = `[Countries] Fetch Countries Error`,
  FETCH_COUNTRY = `[Country] Fetch Country`,
  FETCH_COUNTRY_SUCCESS = `[Country] Fetch Country Success`,
  FETCH_COUNTRY_ERROR = `[Country] Fetch Country Error`,
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

  export const fetchCountry = createAction(
    FetchCountriesTypes.FETCH_COUNTRY,
    props<{ name: string }>()
  );

  export const fetchCountrySuccess = createAction(
    FetchCountriesTypes.FETCH_COUNTRY_SUCCESS,
    props<{ country: Country }>()
  );

  export const fetchCountryError = createAction(
    FetchCountriesTypes.FETCH_COUNTRY
  );
}
