import { createAction, props } from '@ngrx/store';
import { Country } from 'models/model';

export const SelectCountry = `[Country] Select Country`;
export const SelectCountrySuccess = `[Country] Select Country Success`;
export const SelectCountryError = `[Country] Select Country Error`;

export namespace SelectCountryActions {
  export const selectCountry = createAction(
    SelectCountry,
    props<{ name: string }>()
  );

  export const selectCountrySuccess = createAction(
    SelectCountry,
    props<{ country: Country }>()
  );
}
