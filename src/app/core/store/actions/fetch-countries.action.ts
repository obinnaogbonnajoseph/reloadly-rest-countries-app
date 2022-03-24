import { createAction, props } from '@ngrx/store';
import { Country, Region } from 'models/model';

export const FetchCountries = `[Countries] Fetch Countries`;
export const FetchCountriesSuccess = `[Countries] Fetch Countries Success`;
export const FetchCountriesError = `[Countries] Fetch Countries Error`;

export namespace FetchCountriesActions {
  export const fetchCountries = createAction(
    FetchCountries,
    props<{ region?: Region }>()
  );

  export const fetchCountriesSuccess = createAction(
    FetchCountriesSuccess,
    props<{ countries: Country[] }>()
  );

  export const fetchCountriesError = createAction(FetchCountriesError);
}
