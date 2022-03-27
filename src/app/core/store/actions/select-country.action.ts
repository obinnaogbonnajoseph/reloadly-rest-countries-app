import { createAction, props } from '@ngrx/store';
import { Country } from 'models/model';

export enum SelectCountryTypes {
  SELECT_COUNTRY = `[Country] Select Country`,
  SELECT_COUNTRY_SUCCESS = `[Country] Select Country Success`,
  SELECT_COUNTRY_ERROR = `[Country] Select Country Error`,
}

export namespace SelectCountryActions {
  export const selectCountry = createAction(
    SelectCountryTypes.SELECT_COUNTRY,
    props<{ name: string }>()
  );

  export const selectCountrySuccess = createAction(
    SelectCountryTypes.SELECT_COUNTRY_SUCCESS,
    props<{ country: Country }>()
  );
}
