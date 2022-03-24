import { Router } from '@angular/router';
import { CountryService } from 'services/country.service';

export const countryServiceStub: Partial<CountryService> = {};

export const routerStub: Partial<Router> = {};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type RegionalBloc = {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
};

export type CountryName = Country['alpha2Code'];

export type Region = 'asia' | 'africa' | 'americas' | 'oceania' | 'europe';

export type Country = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  continent: string;
  population: string;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: { [K: string]: string };
  flags: string[];
  regionalBlocs: RegionalBloc[];
  cioc: string;
  independent: boolean;
};

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
}
