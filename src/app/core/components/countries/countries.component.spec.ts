import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Country } from 'models/model';
import { mockCountry, routerSpy } from 'models/mock.model';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { SelectCountryActions } from 'store/actions/select-country.action';
import { initialState } from 'store/reducers/countries.reducer';
import { CountriesSelector } from 'store/selectors/countries.selector';
import { CountriesComponent } from './countries.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let router: Router;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountriesComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
      ],
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
    router = fixture.debugElement.injector.get(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetch countries on init and listen for loading', fakeAsync(() => {
    spyOn(store, 'dispatch').and.callFake((action: any) => {});
    component.loading$ = of(true);
    component.ngOnInit();
    tick();
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      FetchCountriesActions.fetchCountries({})
    );
    expect(component.loading).toEqual(true);
  }));

  it('should navigate to selected country and dispatch action', () => {
    spyOn(store, 'dispatch').and.callFake((action: any) => {});
    component.selectCountry('Nigeria');
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.all().flatMap((val) => val.args);
    expect(navArgs)
      .withContext('should navigate to country with name')
      .toContain(['country', 'Nigeria']);
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      SelectCountryActions.selectCountry({ name: 'Nigeria' })
    );
  });

  it('should search country', fakeAsync(() => {
    spyOn(store, 'dispatch').and.callFake((action: any) => {});
    spyOn(component, 'searchCountry').and.callFake(() => {});
    component.ngAfterViewInit();
    expect(component.searchCountry).toHaveBeenCalled();
  }));

  it('should dispatch filter by region action', () => {
    spyOn(store, 'dispatch').and.callFake((action: any) => {});
    component.filterByRegion('africa');
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      FetchCountriesActions.fetchCountries({ region: 'africa' })
    );
  });
});
