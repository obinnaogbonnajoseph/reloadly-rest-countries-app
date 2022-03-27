import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'store/reducers/countries.reducer';
import { CountryComponent } from './country.component';
import { CountriesSelector } from 'store/selectors/countries.selector';
import { mockCountry } from 'src/app/core/mocks/mock.model';
import { Country } from 'models/model';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: CountriesSelector.selectSelectedCountry,
              value: mockCountry,
            },
            {
              selector: CountriesSelector.selectLoading,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => store?.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch country from store', (done: DoneFn) => {
    component.country$.subscribe((country) => {
      expect(country?.borders)
        .withContext('should expect country data to equal store data')
        .toEqual(mockCountry.borders);
      done();
    });
  });

  it('should fetch loading from store', (done: DoneFn) => {
    component.loading$.subscribe((loading) => {
      expect(loading)
        .withContext('should expect loading to equal store data')
        .toEqual(false);
      done();
    });
  });

  it('should return border countries', () => {
    const borderCountries = component.borderCountries(mockCountry as Country);
    expect(borderCountries).toEqual(mockCountry.borders as string[]);
  });
});
