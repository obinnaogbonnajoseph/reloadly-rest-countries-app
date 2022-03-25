import { createSelector } from '@ngrx/store';
import { countriesFeature } from 'store/feature/country.feature';

export namespace CountriesSelector {
  export const { selectCountries, selectSelectedCountry, selectLoading } =
    countriesFeature;

  export const selectVisitedCountries = createSelector(
    countriesFeature.selectVisitedCountries,
    (visitedCountries) => Array.from(visitedCountries)
  );
}
