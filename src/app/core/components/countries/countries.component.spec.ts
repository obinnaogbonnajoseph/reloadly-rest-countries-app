import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Country } from 'models/model';
import { mockCountry } from 'src/app/core/mocks/mock.model';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { SelectCountryActions } from 'store/actions/select-country.action';
import { initialState } from 'store/reducers/countries.reducer';
import { CountriesSelector } from 'store/selectors/countries.selector';

import { CountriesComponent } from './countries.component';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let router: Router;
  let store: MockStore;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [CountriesComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: CountriesSelector.selectCountries,
              value: [mockCountry as Country],
            },
            {
              selector: CountriesSelector.selectLoading,
              value: false,
            },
            {
              selector: CountriesSelector.selectVisitedCountries,
              value: [mockCountry as Country],
            },
          ],
        }),
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to selected country and dispatch action', () => {
    spyOn(store, 'dispatch').and.callFake((action: any) => {});
    component.selectCountry('Nigeria');
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs)
      .withContext('should navigate to country with name')
      .toEqual(['country', 'Nigeria']);
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      SelectCountryActions.selectCountry({ name: 'Nigeria' })
    );
  });

  it('should dispatch filter by region action', () => {
    spyOn(store, 'dispatch').and.callFake((action: any) => {});
    component.filterByRegion('africa');
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      FetchCountriesActions.fetchCountries({ region: 'africa' })
    );
  });
});
