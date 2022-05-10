import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'store/reducers/countries.reducer';
import { CountryComponent } from './country.component';
import { CountriesSelector } from 'store/selectors/countries.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { activatedRouteSpy, mockCountry, routerSpy } from 'models/mock.model';
import { MatIconModule } from '@angular/material/icon';
import { Country } from 'models/model';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { firstValueFrom } from 'rxjs';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryComponent],
      imports: [MatIconModule],
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
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  afterEach(() => store?.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch country from store', async () => {
    await firstValueFrom(component.country$).then((country) => {
      expect(country?.borders)
        .withContext('should expect country data to equal store data')
        .toEqual(mockCountry.borders);
    });
  });

  describe('it should perform actions on init', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch').and.callFake((action: any) => {});
    });
    it('should dispatch fetch country action on null country', fakeAsync(() => {
      store.overrideSelector(CountriesSelector.selectSelectedCountry, null);
      activatedRouteSpy.snapshot = {
        params: {
          name: 'Nigeria',
        },
      };
      component.ngOnInit();
      tick();
      expect(store.dispatch).toHaveBeenCalledWith(
        FetchCountriesActions.fetchCountry({ name: 'Nigeria' })
      );
    }));

    it('should not dispatch fetch country action on defined country', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(store.dispatch).not.toHaveBeenCalled();
    }));
  });

  it('should get languages from country', () => {
    const languages = component.getLanguages(mockCountry as Country);
    expect(languages).toEqual('English');
  });

  it('should go back to countries route', () => {
    component.back();
    const routerSpy = router.navigate as jasmine.Spy;
    const navArgs = routerSpy.calls.all().flatMap((val) => val.args);
    expect(navArgs)
      .withContext('should navigate to countries')
      .toContain(['countries']);
  });

  it('should set isComponentActive to false on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.isComponentActive).toEqual(false);
  });
});
