import { createReducer, on } from '@ngrx/store';
import { CountryState } from 'models/model';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { SearchCountriesActions } from 'store/actions/search-countries.action';
import { SelectCountryActions } from 'store/actions/select-country.action';

export const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  visitedCountries: new Set([]),
};

export const countriesReducer = createReducer(
  initialState,
  on(
    FetchCountriesActions.fetchCountries,
    (state): CountryState => ({ ...state, loading: true })
  ),
  on(
    FetchCountriesActions.fetchCountriesSuccess,
    (state, { countries }): CountryState => ({
      ...state,
      countries,
      loading: false,
    })
  ),
  on(
    FetchCountriesActions.fetchCountriesError,
    (state): CountryState => ({ ...state, loading: false })
  ),
  on(
    SearchCountriesActions.searchCountries,
    (state): CountryState => ({ ...state, loading: true })
  ),
  on(
    SearchCountriesActions.searchCountriesSuccess,
    (state, { countries }): CountryState => {
      return {
        ...state,
        countries,
        loading: false,
      };
    }
  ),
  on(
    SearchCountriesActions.searchCountriesError,
    (state): CountryState => ({ ...state, loading: false })
  ),
  on(
    SelectCountryActions.selectCountry,
    (state): CountryState => ({ ...state, loading: true })
  ),
  on(
    SelectCountryActions.selectCountrySuccess,
    (state, { country }): CountryState => ({
      ...state,
      selectedCountry: country ?? null,
      loading: false,
      visitedCountries: country
        ? state.visitedCountries.add(country.name)
        : state.visitedCountries,
    })
  )
);
