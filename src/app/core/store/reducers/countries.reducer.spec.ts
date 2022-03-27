import { Country, CountryState } from 'models/model';
import { mockCountry } from 'src/app/core/mocks/mock.model';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { SearchCountriesActions } from 'store/actions/search-countries.action';
import { SelectCountryActions } from 'store/actions/select-country.action';
import {
  countriesReducer,
  initialState,
} from 'store/reducers/countries.reducer';

describe('Countries Reducer', () => {
  it('should initiate fetch countries and retrieve state immutably', () => {
    const action = FetchCountriesActions.fetchCountries({});
    const newState = {
      ...initialState,
      loading: true,
    };
    const state = countriesReducer(initialState, action);
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should initiate search countries and retrieve state immutably', () => {
    const action = SearchCountriesActions.searchCountries({ name: 'Nigeria' });
    const newInitialState: CountryState = {
      ...initialState,
      countries: [
        mockCountry as Country,
        { name: 'Benin', borders: ['Togo', 'Niger', 'Nigeria'] } as Country,
      ],
    };
    const newState: CountryState = {
      ...newInitialState,
      countries: [mockCountry as Country],
    };
    const state = countriesReducer(newInitialState, action);
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should initiate select country and retrieve state immutably', () => {
    const action = SelectCountryActions.selectCountry({ name: 'Nigeria' });
    const newInitialState: CountryState = {
      ...initialState,
      countries: [mockCountry as Country],
    };
    const newState: CountryState = {
      ...newInitialState,
      selectedCountry: mockCountry as Country,
    };
    const state = countriesReducer(newInitialState, action);
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
