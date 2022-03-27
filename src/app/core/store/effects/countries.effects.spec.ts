import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Country } from 'models/model';
import { Observable, of, throwError } from 'rxjs';
import { CountryService } from 'services/country.service';
import { mockCountry } from 'src/app/core/mocks/mock.model';
import {
  FetchCountriesActions,
  FetchCountriesError,
  FetchCountriesSuccess,
} from 'store/actions/fetch-countries.action';
import {
  SearchCountriesActions,
  SearchCountriesSuccess,
} from 'store/actions/search-countries.action';
import {
  SelectCountryActions,
  SelectCountryError,
  SelectCountrySuccess,
} from 'store/actions/select-country.action';
import { CountriesEffects } from 'store/effects/countries.effects';
import { CountriesSelector } from 'store/selectors/countries.selector';

describe('CountriesEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: CountriesEffects;
  let countryService: any;

  beforeEach(() => {
    countryService = jasmine.createSpyObj('CountryService', [
      'getAll',
      'getRegion',
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
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fetch countries and dispatch success', (done: DoneFn) => {
    actions$ = of(FetchCountriesActions.fetchCountries({}));
    countryService.getAll.and.returnValue(of([mockCountry]));
    effects.fetchCountries$.subscribe((action) => {
      expect(action).toEqual({
        type: FetchCountriesSuccess,
        payload: [mockCountry as Country],
      });
      done();
    });
  });

  it('should fetch countries by region and dispatch success', (done: DoneFn) => {
    actions$ = of(FetchCountriesActions.fetchCountries({ region: 'africa' }));
    countryService.getRegion.and.returnValue(of([mockCountry]));
    effects.fetchCountries$.subscribe((action) => {
      expect(action).toEqual({
        type: FetchCountriesSuccess,
        payload: [mockCountry as Country],
      });
      done();
    });
  });

  it('should fail to fetch countries', (done: DoneFn) => {
    actions$ = of(FetchCountriesActions.fetchCountries({}));
    countryService.getAll.and.returnValue(
      throwError(() => new Error('Could not Fetch countries'))
    );
    effects.fetchCountries$.subscribe((action) => {
      expect(action).toEqual({ type: FetchCountriesError });
    });
    done();
  });

  it('should search countries and dispatch success', (done: DoneFn) => {
    actions$ = of(SearchCountriesActions.searchCountries({ name: 'Nigeria' }));
    effects.searchCountries$.subscribe((action) => {
      expect(action).toEqual({
        type: SearchCountriesSuccess,
        payload: [mockCountry as Country],
      });
      done();
    });
  });

  it('should select country and dispatch success', (done: DoneFn) => {
    actions$ = of(SelectCountryActions.selectCountry({ name: 'Nigeria' }));
    effects.selectCountry$.subscribe((action) => {
      expect(action).toEqual({
        type: SelectCountrySuccess,
        payload: mockCountry as Country,
      });
      done();
    });
  });
});
