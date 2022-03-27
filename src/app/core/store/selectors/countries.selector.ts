import { createSelector } from '@ngrx/store';
import { countriesFeature } from 'store/feature/country.feature';

export namespace CountriesSelector {
  export const selectVisitedCountries = createSelector(
    countriesFeature.selectVisitedCountries,
    (visitedCountries) => Array.from(visitedCountries)
  );

  export const selectCountries = createSelector(
    countriesFeature.selectCountries,
    (countries) => countries
  );

  export const selectSelectedCountry = createSelector(
    countriesFeature.selectSelectedCountry,
    (country) => country
  );

  export const selectLoading = createSelector(
    countriesFeature.selectLoading,
    (loading) => loading
  );
}
