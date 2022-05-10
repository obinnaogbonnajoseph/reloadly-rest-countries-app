import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Country } from 'models/model';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { CountryService } from 'services/country.service';
import { mockCountry } from 'models/mock.model';
import {
  FetchCountriesActions,
  FetchCountriesTypes,
} from 'store/actions/fetch-countries.action';
import {
  SearchCountriesActions,
  SearchCountriesTypes,
} from 'store/actions/search-countries.action';
import {
  SelectCountryActions,
  SelectCountryTypes,
} from 'store/actions/select-country.action';
import { CountriesEffects } from 'store/effects/countries.effects';
import { CountriesSelector } from 'store/selectors/countries.selector';

describe('CountriesEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: CountriesEffects;
  let countryService: any;
  let store: MockStore;

  beforeEach(() => {
    countryService = jasmine.createSpyObj('CountryService', [
      'getAll',
      'getRegion',
      'searchByName',
    ]);
    TestBed.configureTestingModule({
      providers: [
        CountriesEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: CountriesSelector.selectCountries,
              value: [mockCountry as Country],
            },
          ],
        }),
        {
          provide: CountryService,
          useValue: countryService,
        },
      ],
    });

    effects = TestBed.inject(CountriesEffects);
    countryService = TestBed.inject(CountryService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Fetch countries ', () => {
    it('should fetch countries and dispatch success', async () => {
      actions$ = of(FetchCountriesActions.fetchCountries({}));
      countryService.getAll.and.returnValue(of([mockCountry]));
      await firstValueFrom(effects.fetchCountries$).then((action) => {
        expect(action).toEqual({
          type: FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
          countries: [mockCountry as Country],
        });
      });
    });

    it('should fetch countries by region and dispatch success', async () => {
      actions$ = of(FetchCountriesActions.fetchCountries({ region: 'africa' }));
      countryService.getRegion.and.returnValue(of([mockCountry]));
      await firstValueFrom(effects.fetchCountries$).then((action) => {
        expect(action).toEqual({
          type: FetchCountriesTypes.FETCH_COUNTRIES_SUCCESS,
          countries: [mockCountry as Country],
        });
      });
    });

    it('should fail to fetch countries', async () => {
      actions$ = of(FetchCountriesActions.fetchCountries({}));
      countryService.getAll.and.returnValue(
        throwError(() => new Error('Could not Fetch countries'))
      );
      await firstValueFrom(effects.fetchCountries$).then((action) => {
        expect(action).toEqual({
          type: FetchCountriesTypes.FETCH_COUNTRIES_ERROR,
        });
      });
    });
  });

  describe('Fetch Country', () => {
    it('should fetch country and dispatch success', async () => {
      actions$ = of(FetchCountriesActions.fetchCountry({ name: 'Nigeria' }));
      countryService.searchByName.and.returnValue(of([mockCountry as Country]));
      await firstValueFrom(effects.fetchCountry$).then((action) => {
        expect(action).toEqual({
          type: FetchCountriesTypes.FETCH_COUNTRY_SUCCESS,
          country: mockCountry as Country,
        });
      });
    });
    it('should fail to fetch country', async () => {
      actions$ = of(FetchCountriesActions.fetchCountry({ name: 'Nigeria' }));
      countryService.searchByName.and.returnValue(
        throwError(() => new Error('Could not fetch country'))
      );
      await firstValueFrom(effects.fetchCountry$).then((action) => {
        expect(action).toEqual({
          type: FetchCountriesTypes.FETCH_COUNTRY_ERROR,
        });
      });
    });
  });

  describe('Search countries ', () => {
    it('should search countries and dispatch success', async () => {
      actions$ = of(
        SearchCountriesActions.searchCountries({ name: 'Nigeria' })
      );
      countryService.searchByName.and.returnValue(of([mockCountry as Country]));
      countryService.getAll.and.returnValue(of([mockCountry as Country]));
      await firstValueFrom(effects.searchCountries$).then((action) => {
        expect(action).toEqual({
          type: SearchCountriesTypes.SEARCH_COUNTRIES_SUCCESS,
          countries: [mockCountry as Country],
        });
      });
    });

    it('should search countries with empty text and return success', async () => {
      actions$ = of(SearchCountriesActions.searchCountries({ name: '' }));
      countryService.searchByName.and.returnValue(of([mockCountry as Country]));
      countryService.getAll.and.returnValue(of([mockCountry as Country]));
      await firstValueFrom(effects.searchCountries$).then((action) => {
        expect(action).toEqual({
          type: SearchCountriesTypes.SEARCH_COUNTRIES_SUCCESS,
          countries: [mockCountry as Country],
        });
      });
    });

    it('should fail to search countries and dispatch fail action', async () => {
      spyOn(store, 'select').and.returnValue(
        throwError(() => new Error('Cannot search countries'))
      );
      actions$ = of(
        SearchCountriesActions.searchCountries({ name: 'Nigeria' })
      );
      await firstValueFrom(effects.searchCountries$).then((action) => {
        expect(action).toEqual({
          type: SearchCountriesTypes.SEARCH_COUNTRIES_ERROR,
        });
      });
    });
  });

  describe('Select Countries', () => {
    it('should select country and dispatch success', async () => {
      actions$ = of(SelectCountryActions.selectCountry({ name: 'Nigeria' }));
      await firstValueFrom(effects.selectCountry$).then((action) => {
        expect(action).toEqual({
          type: SelectCountryTypes.SELECT_COUNTRY_SUCCESS,
          country: mockCountry as Country,
        });
      });
    });

    it('should fail to select country and dispatch fail action', async () => {
      spyOn(store, 'select').and.returnValue(
        throwError(() => new Error('Cannot select country'))
      );
      actions$ = of(SelectCountryActions.selectCountry({ name: 'Nigeria' }));
      await firstValueFrom(effects.selectCountry$).then((action) => {
        expect(action).toEqual({
          type: SelectCountryTypes.SELECT_COUNTRY_ERROR,
        });
      });
    });
  });
});
