import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'store/reducers/countries.reducer';
import { CountryComponent } from './country.component';
import { CountriesSelector } from 'store/selectors/countries.selector';
import { Router } from '@angular/router';
import { mockCountry, routerSpy } from 'models/mock.model';
import { MatIconModule } from '@angular/material/icon';
import { Country } from 'models/model';

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

  it('should fetch country from store', (done: DoneFn) => {
    component.country$.subscribe((country) => {
      expect(country?.borders)
        .withContext('should expect country data to equal store data')
        .toEqual(mockCountry.borders);
      done();
    });
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
});
