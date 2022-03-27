import { initialState } from 'store/reducers/countries.reducer';
import { CountriesSelector } from 'store/selectors/countries.selector';

describe('Countries Selectors', () => {
  it('should select countries', () => {
    const result = CountriesSelector.selectCountries.projector(
      initialState.countries
    );
    expect(result.length).toEqual(initialState.countries.length);
  });

  it('should select country', () => {
    const result = CountriesSelector.selectSelectedCountry.projector(
      initialState.selectedCountry
    );
    expect(result).toBeNull();
  });

  it('should select loading', () => {
    const result = CountriesSelector.selectLoading.projector(
      initialState.loading
    );
    expect(result).toBeFalse();
  });

  it('should select visited countries', () => {
    const result = CountriesSelector.selectVisitedCountries.projector(
      initialState.visitedCountries
    );
    expect(result.length).toEqual(initialState.visitedCountries.size);
  });
});
