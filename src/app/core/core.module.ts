import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CountryComponent } from 'components/country/country.component';
import { countriesFeature } from 'store/feature/country.feature';
import { EffectsModule } from '@ngrx/effects';
import { CountriesEffects } from 'store/effects/countries.effects';

@NgModule({
  declarations: [CountryComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(countriesFeature),
    EffectsModule.forFeature([CountriesEffects]),
  ],
})
export class CoreModule {}
