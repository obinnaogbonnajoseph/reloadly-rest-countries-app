import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CountriesEffects } from 'store/effects/countries.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: CountriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(CountriesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
