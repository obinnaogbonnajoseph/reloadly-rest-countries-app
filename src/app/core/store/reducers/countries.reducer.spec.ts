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
  describe('Fetch Countries ', () => {
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

    it('should fetch countries successfully and retrieve state immutably', () => {
      const action = FetchCountriesActions.fetchCountriesSuccess({
        countries: [mockCountry as Country],
      });
      const newState = {
        ...initialState,
        countries: [mockCountry as Country],
      };
      const state = countriesReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should fetch countries error and retrieve state immutably', () => {
      const action = FetchCountriesActions.fetchCountriesError();
      const newState = {
        ...initialState,
      };
      const state = countriesReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Search Countries ', () => {
    it('should initiate search countries and retrieve state immutably', () => {
      const action = SearchCountriesActions.searchCountries({
        name: 'Nigeria',
      });
      const newInitialState: CountryState = {
        ...initialState,
        countries: [
          mockCountry as Country,
          { name: 'Benin', borders: ['Togo', 'Niger', 'Nigeria'] } as Country,
        ],
      };
      const newState: CountryState = {
        ...newInitialState,
        loading: true,
      };
      const state = countriesReducer(newInitialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should search countries success and retrieve state immutably', () => {
      const action = SearchCountriesActions.searchCountriesSuccess({
        countries: [mockCountry as Country],
      });
      const newState = {
        ...initialState,
        countries: [mockCountry as Country],
      };
      const state = countriesReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should search countries error and retrieve state immutably', () => {
      const action = SearchCountriesActions.searchCountriesError();
      const newState = {
        ...initialState,
      };
      const state = countriesReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Select Country ', () => {
    it('should initiate select country and retrieve state immutably', () => {
      const action = SelectCountryActions.selectCountry({ name: 'Nigeria' });
      const newInitialState: CountryState = {
        ...initialState,
        countries: [mockCountry as Country],
      };
      const newState: CountryState = {
        ...newInitialState,
        loading: true,
      };
      const state = countriesReducer(newInitialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should select country success and retrieve state immutably ', () => {
      const action = SelectCountryActions.selectCountrySuccess({
        country: mockCountry as Country,
      });
      const newState = {
        ...initialState,
        selectedCountry: mockCountry as Country,
        visitedCountries: new Set().add(mockCountry.name),
      };
      const state = countriesReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);

      const action2 = SelectCountryActions.selectCountrySuccess({
        country: undefined as unknown as Country,
      });
      const newState2 = {
        ...initialState,
      };
      const state2 = countriesReducer(initialState, action2);
      expect(state2).toEqual(newState2);
      expect(state2).not.toBe(newState2);
    });
  });
});
