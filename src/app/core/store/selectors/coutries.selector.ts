import { countriesFeature } from 'store/feature/country.feature';

export namespace CountriesSelector {
  export const { selectCountries, selectSelectedCountry, selectLoading } =
    countriesFeature;
}
