import { createFeature } from '@ngrx/store';
import { countriesReducer } from 'store/reducers/countries.reducer';

export const countriesFeature = createFeature({
  name: 'countries-v2',
  reducer: countriesReducer,
});
